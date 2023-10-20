const express = require('express');
const Genre = require('../models/genre')

function create(req, res, next){
    const description = req.body.description;
    const status = req.body.status;
    let genre = new Genre({
        description:description,
        status:status
    });
/*
100 - informativos, que esta pasando
200 - ok
300 -  màs de 1 respuesta
400 errores cliente
500 errores del servidor

-----------------------------
casos de uso:
objetos embebido: cuando un documento esta dentro de otro documento
referencias: equivalente d e la relacion de uno a muchos.
*/
    genre.save().then(obj => res.status(200).json({
      msg:"Genero creado correctamente", 
      obj:obj
    })).catch(ex => res.status(500).json({
      msg:"No se pudo almacenar el genero",
      obj:ex
    }));
}

function list(req, res, next) {
    Genre.find().then(objs => res.stauts(200).json({
      msg:"Lista de generos",
      obj:objs
    })).catch(ex => res.status(500).json({
      msg: "No se pudo consultar la lista de generos",
      obj:ex
    }));
  }

  function index(req, res, next){
    const id=req.params.id;
    Genre.findOne({"_id":id}).then(obj => res.stauts(200).json({
      msg:`Genero con el id ${id}`,
      obj:obj
    })).catch(ex => res.status(500).json({
      msg: "No se pudo consultar la lista de generos",
      obj:ex
    }));

  }


  function replace (req, res, next){
    const id= req.params.id;
    let description = req.body.description ? req.body.description : "";
    let status = req.body.status ? req.body.status : "";

    let genre = new Object({
      _description:description,
      _status:status
    });

    Genre.findOneAndUpdate({"_id":id}, genre,{new:true})
            .then(obj => res.status(200).json({
              msg: "Genero remplazado correctamente",
              obj:obj
            })).catch(ex => res.status(500).json({
              msg: "No se pudo remplazar el genero correctamente",
              obj:ex
            }));


  }

  function update(req, res, next){
    const id = req.params.id;
    let description = req.body.description;
    let status = req.body.status;

    let genre = new Object();
    if (description) genre._description=description;
    if(status)genre._status=status;

    Genre.findOneAndUpdate({"_id":id}, genre).then(obj => res.status(200).json({
      msg:"Genero actualizado correctamente",
      obj:obj
    })).catch(ex => res.status(500).json({
      msg: "No se pudo remplazar el genero correctamente",
      obj:ex
    }));

  }

  function destroy(req, res, next){
    const id =req.params.id;
    Genre.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
      msg:"Genero eliminado correctamente",
      obj: obj

    })).catch(ex => res.status(500).json({
      msg: "No se pudo eliminar el genero",
      obj:ex
    }));

  }

  module.exports={
    create,list, index, replace, update, destroy
  };