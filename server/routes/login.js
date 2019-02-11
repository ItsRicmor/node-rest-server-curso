const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { CLIENT_ID } = process.env

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

const Usuario = require('../models/usuario')
const app = express()

const { CADUCIDAD_TOKEN, SEED } = process.env

app.post('/login', (req, res) => {

    const { body: { email, password } } = req
    Usuario.findOne({ email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            })
        }
        if (!bcrypt.compareSync(password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            })
        }
        let token = jwt.sign({
            usuario: usuarioDB
        }, SEED, { expiresIn: CADUCIDAD_TOKEN })
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })
    })
})

// Configuraciones de Google
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });
    const { name:nombre, email, picture:img } = ticket.getPayload() 
    return {
        nombre,
        email,
        img,
        google: true
    }
}


app.post('/google', (req, res) => {
    const { body: { token } } = req
    const googleUser = await verify(token)
    res.json({
        token
    })
})


module.exports = app;