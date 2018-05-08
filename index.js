
// Requerimos mongoose una forma mas sencilla de conectarse a la bd ( mongoDB )
const mongoose = require('mongoose')

// Requerimos el archivo app que incluye la configuracion de la aplicacion
const app = require('./app')

// Requerimos el archivo de configuracion
const config = require('./config') 

// Conexion a la base de datos
mongoose.connect(config.bd, (err, res) => {
    if (err) throw err
    console.log('Conectado a la base de datos...')

    // Corriendo la app
    app.listen(config.port, () => {
        console.log(`API REST funcionando en http://localhost:${config.port}`)
    })
})

/*
    Quede en el video 17
*/