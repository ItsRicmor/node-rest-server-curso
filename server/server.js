require('./config/config')
const { PORT } = process.env

const express = require('express')
const mongoose = require('mongoose')

const app = express()

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuario'))

const config = {
    autoIndex: false,
    useNewUrlParser: true,
};
mongoose.connect('mongodb://localhost:27017/cafe', config)


app.listen(PORT, () => {
    console.log('Escuchando puerto: ', PORT)
})