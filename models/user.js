'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema

// Para encriptar el pass del user
const bcrypt = require('bcrypt-nodejs')
// Para manejar el tipo de encriptacion de gravatar
const crypto = require('crypto') 

const userSchema = new schema({
    // Estandarizamos el formato del email y validamos que sea unico en la bd
    email: { type: String, unique: true, lowercase: true },
    name: String,
    photo: String,
    pass: { type: String /*select: false*/ },
    create: { type: Date, default: Date.now() },
    logiOut: Date
})

// Encriptamos la contraeña
userSchema.pre('save', function(next) {
    if( !this.isModified('pass') ) return next

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err)

        bcrypt.hash(this.pass, salt, null, (err, hash) => {
            if(err) return next(err)

            this.pass = hash
            next()
        })
    })
})

// Devolvemos una foto de perfil por defaul al usuario
/*userSchema.methods.gravatar = function() {
    if(!this.email) return 'https//gravatar.com/avatar/?s=200d-retro'

    // pasamos el email de usuario a el formato de encryptacion de ms5
    const md5 = crypto.createHash('md5').update(this.email).digest('hex')

    return `https://gravatar.com/avatar/${md5}?s=200d=retro`
}*/

userSchema.methods.compararPass = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.pass, (err, isMatch) => {
      cb(err, isMatch)
    });
  }

// Exportamos
module.exports = mongoose.model('user', userSchema)