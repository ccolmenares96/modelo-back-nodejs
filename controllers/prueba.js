// Requerimos el modelo creado
const pruebaS = require('../models/prueba')

// funcion para consulta general
function getPruebaG(req, res){
    pruebaS.find({}, (err, reg) => {
        // En caso de error
        if(err) return res.status(500).send({menssage: `Error dc: ${err}`})
        // En caso que no se encuentre nada
        if(!res) return res.status(404).send({menssage: 'Sin resultados'})
        
        // En caso que si encuentre el registro
        res.send(200, reg)
    })
}

// funcion para consulta por id
function getPrueba(req, res){
    let id = req.params.id

    pruebaS.findById(id, (err, reg) => {
        // En caso de error
        if(err) return res.status(500).send({menssage: `Error: ${err}`})
        // En caso que no se encuentre nada
        if(!res) return res.status(404).send({menssage: 'Sin resultados'})
        
        // En caso que si encuentre el registro
        res.status(200).send(reg)
    })
}

// funcion de insert
function savePrueba(req, res){
    console.log('Peticion post insert')
    console.log(req.body)

    let prueba = new pruebaS()
    prueba.texto = req.body.texto
    prueba.numero = req.body.numero
    prueba.selection = req.body.selection
    prueba.radio = req.body.radio
    prueba.textArea = req.body.textArea
    
    prueba.save((err, pruebaStore) => {
        if(err) res.status(500).send({menssage: "Error al registrar"})

        res.status(200).send(pruebaStore)
    })
}

// funcion para modificar
function updatePrueba(req, res){
    let id = req.params.id
    
    pruebaS.findByIdAndUpdate(id, req.body, (err, regUpdate) => {
        // En caso de error
        if(err) return res.status(500).send({menssage: `Error: ${err}`})

        res.status(200).send({menssage: 'Registro modificado', status: 200})
    })
}

// funcion para eliminar
function deletePrueba(req, res){
    let id = req.params.id

    pruebaS.findById(id, (err, reg) => {
        // En caso de error
        if(err) return res.status(500).send({menssage: `Error: ${err}`})
        
        reg.remove(err =>{
            if(err) return res.status(500).send({menssage: `Error: ${err}`})
            res.status(200).send({menssage: 'Registro eliminado con exito', status: 200})
        })
    })
}

// Exportamos
module.exports = {
    getPruebaG,
    getPrueba,
    savePrueba,
    updatePrueba,
    deletePrueba
}