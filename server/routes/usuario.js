const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const _ = require('underscore')
const Usuario = require('../models/usuario')
const { verificaToken, verificaAdminRole } = require('../middlewares/authentication')
app.get('/usuario', verificaToken, (req, res) => {
    let desde = req.query.desde || 0
    desde = Number(desde)

    let limite = req.query.limite || 5
    limite = Number(limite)

    Usuario.find({ estado: true }, 'nombre email role estado google img')
            .skip(desde)
            .limit(limite)
            .exec((err, usuarios) => {
                if(err){
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }
                Usuario.countDocuments({ estado: true }, (err, count) => {
                    res.json({
                        ok: true,
                        usuarios,
                        count
                    })
                })
            })
})

app.post('/usuario', [verificaToken, verificaAdminRole], (req, res) => {
    const { body: { nombre, email, password, role } } = req


    const usuario = new Usuario({
        nombre,
        email,
        password: bcrypt.hashSync(password, 10),
        role
    })

    usuario.save((err, usuarioDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.put('/usuario/:id', [verificaToken, verificaAdminRole], (req, res) => {
    const { id } = req.params;
    const body = _.pick( req.body,['nombre','email','img','role','estado',])
    

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidator: true }, (err, usuarioDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.delete('/usuario/:id', [verificaToken, verificaAdminRole], (req, res) => {
    const { id } = req.params
    const newState = { estado: false }
    Usuario.findByIdAndUpdate(id, newState, { new: true },(err, usuarioBorrado) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if(!usuarioBorrado){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario no encontrado'
                }
            })
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })
})

module.exports = app