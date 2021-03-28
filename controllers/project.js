'use strict'

let Project = require('../models/project');
let fs = require('fs');
let path = require('path');

let controller = {}

controller.home = (req,res) => {
    return res.status(200).send({
        message: "Soy el Home"
    });
}

controller.test = (req,res) => {
    return res.status(200).send({
        message: "Soy el Test"
    });
}

controller.saveProject = (req,res) => {
    let project = new Project();

    let params = req.body;
    project.name = params.name;
    project.description = params.description;
    project.category = params.category;
    project.year = params.year;
    project.langs = params.langs;
    project.image = null;

    project.save( (err,projectStored) => {
        if(err) return res.status(500).send({message: err})

        if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto'});

        return res.status(200).send({project: projectStored});
    });
};

controller.getProject = (req,res) => {
    let projectId = req.params.id;

    if(projectId === null) return res.status(404).send({message: 'El proyecto no existe'});
    

    Project.findById(projectId, (err, project) => {
        
        if(err) return res.status(500).send({message: "Error al devolver los datos"})

        if(!project) return res.status(404).send({message: 'El proyecto no existe'});

        return res.status(200).send({
            project
        })
    });
};

controller.getProjects = (req,res) => {

    // Project.find({year: 2019});
    Project.find({}).sort('-year').exec((err,projects) =>{

        if(err) return res.status(500).send({message:"Error al devolver los datos"});

        if(!projects) return res.status(404).send({message:"No hay projectos que mostrar"});

        return res.status(200).send({projects});

    })

}

controller.updateProject = (req,res) => {
    let projectId = req.params.id;
    let update = req.body;

    Project.findByIdAndUpdate(projectId,update,{new:true}, (err,projectUpdated)=>{
        if(err) return res.status(500).send({message:"Error al actualizar los datos"});

        if(!projectUpdated) return res.status(404).send({message:"No hay projectos que actualizar"});

        return res.status(200).send({project: projectUpdated});
    });
}

controller.deleteProject = (req,res) => {
    let projectId = req.params.id;
    
    Project.findByIdAndDelete(projectId,(err, projectDeleted) => {
        if(err) return res.status(500).send({message:"Error al borrar los datos"});

        if(!projectDeleted) return res.status(404).send({message:"No hay projectos que borrar"});

        return res.status(200).send({project: projectDeleted});
    })
}

controller.uploadImage = (req,res) => {
    var projectId = req.params.id;
    var fileName = 'Imagen no subida';

    if(req.files){

        let filePath = req.files.image.path;
        let fileSplit = filePath.split('/');
        let fileName = fileSplit[1];

        //* Here we search for the image format
        let extSplit = fileName.split('.');
        let fileExt = extSplit[1];

        if(fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'gif' ){

            Project.findByIdAndUpdate(projectId,{image: fileName},{new:true}, (err, projectUpdated) => {
                if(err) return res.status(500).send({message:"Error al actualizar los datos"});
    
                if(!projectUpdated) return res.status(404).send({message:"El projecto no existe o la imagen da problemas"});
    
                return res.status(200).send({project: projectUpdated});
            })

        }else{
            fs.unlink(filePath, (err) =>{
                return res.status(200).send({message: "La extension de la imagen no es valida"});
            })
        }

    } else {
        return res.status(200).send({
            message: fileName
        })
    }
}
//! Tiene bug
controller.showImages = (req,res) => {
    
    Project.find({"image":{$exists:true, $ne: null}}).exec((err, docs) => {
        if(err) return res.status(500).send({message:err});

        if(!docs) return res.status(404).send({message: 'No hay projectos'});
        
        for(let i of docs){  
            res.sendFile(path.resolve(`uploads/${i.image}`))
        }
            
    });

}
module.exports = controller;