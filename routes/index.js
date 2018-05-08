'use strict'

const express = require('express')
const auth = require('../middlewares/auth')
const route = express.Router()

// Llamada a los controladores
const pruebaC = require('../controllers/prueba')
const userC = require('../controllers/user')

// Configurandodo el cors para habilitar la peticion de todos los servidores
route.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Peticion para consultar general
route.get('/registro', pruebaC.getPruebaG)
// Perticion para consultar por id
route.get('/registro/:id', pruebaC.getPrueba)
// Peticion para insert
route.post('/insert', pruebaC.savePrueba)
// Perticion para modificar
route.put('/registro/:id', pruebaC.updatePrueba)
// Peticion para eliminar
route.delete('/registro/:id', pruebaC.deletePrueba)

// peticion privada ( Prueba del middleware )
route.get('/privada', auth, (req, res) => {
    res.status(200).send({menssage: 'Acceso consedido'})
})

// Peticion para registrar usuarios
route.post('/user/registro', userC.registro)

// Peticion para el login
route.post('/user/login', userC.login)

// Peticion para consultar a los usuarios
route.get('/users', userC.getUserG)

// Peticion para eliminar un usuario
route.delete('/user/:id', userC.userDetelete)

// Exportamos las rutas
module.exports = route