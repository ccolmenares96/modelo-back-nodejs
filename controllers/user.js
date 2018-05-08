'use strict'

const mongoose = require('mongoose')
const user = require('../models/user')
const service = require('../services')
// Para encriptar el pass del user
const bcrypt = require('bcrypt-nodejs')

function registro(req, res){
    const us = new user({
        email: req.body.email,
        name: req.body.name,
        pass: req.body.pass,
    })

    //us.photo = user.gravatar()

    us.save((err, userthis) => {
        if(err) res.status(500).send({menssage: `Error al registrar el usuario: ${err}`})

        return res.status(200).send({ message: 'Usuario registrado con exito', token: service.createToken(userthis) })
    })
}

function login(req, res){
    user.findOne({email: req.body.email}, (err, reg) =>{
        if(err) return res.status(500).send({menssage: err})
        if(!reg) return res.status(404).send({menssage: 'El email ingresado no esta registrado'})
        
        reg.compararPass(req.body.pass, (err, isMatch) => {
            if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
            if (!isMatch) return res.status(500).send({ msg: `Error al ingresar: ${isMatch}` })
      
            req.user = reg
            return res.status(200).send({ 
                msg: 'Te has logueado correctamente',
                token: service.createToken(reg) 
            })
        })

    }).select('_id email pass');
}

function getUserG(req, res){
    user.find({}, (err, reg) => {
        // En caso de error
        if(err) return res.status(500).send({menssage: `Error: ${err}`})
        // En caso que no se encuentre nada
        if(!reg) return res.status(404).send({menssage: 'Sin resultados'})

        // En caso que si encuentre el registro
        res.status(200).send({registro: reg})
    })
}

function userDetelete(req, res){
    user.findById(req.params.id, (err, reg) => {
        // En caso de error
        if(err) return res.status(500).send({menssage: `Error: ${err}`})

        reg.remove(err => {
            if(err) res.status(500).send({message: `Error ${err}`})
            res.status(200).send({message: 'Usuario elimnado con exito'})
        })
    })
}


module.exports = {
    registro,
    login,
    getUserG,
    userDetelete
}