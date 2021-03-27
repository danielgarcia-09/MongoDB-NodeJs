"use strict";

let mongoose = require('mongoose');
let app = require('./app');
let port = process.env.PORT || 4000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://daniel:garushia09@prueba1.izvsu.mongodb.net/portafolio?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true })
        .then(() =>{
            console.log("Conexion a la base de datos hecha perfectamente!");

            //? Creacion del servidor
            app.listen(port, () => {
                console.log(`Servidor corriendo perfectamente en la url: ${port}`)
            })
            
        }).catch(err=>console.log(err));