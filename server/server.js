require('./config/config')
const { PORT } = process.env

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.get('/usuario', function (req, res) {
    res.json('get usuario')
})

app.post('/usuario', function (req, res) {
    const { body } = req
    if(!body.nombre){
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        })
    } else {
        res.json({body})
    }
})
app.put('/usuario/:id', function (req, res) {
    const { id } = req.params;
    res.json({
        id
    })
})
app.delete('/usuario', function (req, res) {
    res.json('delete usuario')
})

app.listen(PORT, () => {
    console.log('Escuchando puerto: ', PORT)
})