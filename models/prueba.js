'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema

// Creamos el esquema
const pruebaSchema = schema({
    texto: String,
    numero: Number,
    selection: String,
    radio: String,
    textArea: String
})

// Exportamos el modelo
module.exports = mongoose.model('prueba', pruebaSchema)