'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});

module.exports = mongoose.model('Project',ProjectSchema)
//! En el primer parametro pondremos el nombre de la coleccion, el nombre puesto se pone en minuscula y se pluraliza (Project ==> projects)
//* Si el nombre coincide con uno en MongoDb automaticamente los guarda en la coleccion
//todo: RECUERDA!!! en el connection string tiene que estar el nombre de la db, si tiene otro nombre crea la db