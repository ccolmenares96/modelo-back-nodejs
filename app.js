// Uso para buenas paracticas
'use strict'

// Declaracion de express 
const express = require('express')
// Declaracion de body-parser ( Para tener mas control y seguridad a en las peticiones  ) 
const bodyParser = require('body-parser')
// Requerimos las rutas
const routes = require('./routes')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Declaramos que en las peticiones que incluyan /api se use las rutas que estan en routes/index.js
app.use('/api', routes)

module.exports = app