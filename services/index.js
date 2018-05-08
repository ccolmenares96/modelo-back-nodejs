'use strict'

// Para la creacion y manejo de json web token se usa jwt-simple
const jwt = require('jwt-simple')
// Para el manejo facil de las fechas
const moment = require('moment')

const config = require('../config')

// En el modelo real hay que usar un id publico y no el que genera mongo db
function createToken(user){
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }

    // lo codificamos
    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token){
    // hacemos el uso de promesas el 
    //parametro resolve es cunado la promesa resulto y reject es cuando no
    const decode = new Promise((resolve, reject)=> {
        try{
            // Decodificamos el token
            const payload = jwt.decode(token, config.SECRET_TOKEN)

            // Comprobamos que no este caducado
            if(payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    message: 'El token a expirado'
                })
            }

            // si todo esta mandamos el resolve
            resolve(payload.sub)
        }catch(err){
            // Cuando ocurre un error
            reject({
                status: 500,
                message: 'Token invalido'
            })
        }
    })

    return decode
}

module.exports = {
    createToken,
    decodeToken
}