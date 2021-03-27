'use strict'

let express = require('express');

const app = express();

//todo:  Cargar archivos Rutas
var project_routes = require('./routes/project');


//* Middlewares
app.use(express.urlencoded({extended:false}))
app.use(express.json());

//? CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//* Rutas
 app.use('/api', project_routes);
//? app.use('/', project_routes);

//! Exportar
module.exports = app;