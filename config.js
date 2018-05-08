// Variables de copnfiguracion
module.exports = {
    port: process.env.port || 3000,
    bd: process.env.MONGODB || 'mongodb://localhost:27017/prueba_api',
    SECRET_TOKEN: '96/colmenares'
}