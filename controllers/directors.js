const express = require('express');
const Director = require('../models/director')

function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;
    let director = new Director({
        name:name,
        lastName:lastName
    });
/*
100 - informativos
200 - ok
300 -  màs de 1 respuesta
400 errores cliente
500 errores del servidor

-----------------------------
casos de uso:
objetos embebido: cuando un documento esta dentro de otro documento
referencias: equivalente de la relacion de uno a muchos.
*/
    director.save().then(obj => res.status(200).json({
      msg:"Director creado correctamente", 
      obj:obj
    })).catch(ex => res.status(500).json({
      msg:"No se pudo almacenar el director",
      obj:ex
    }));
}

function list(req, res, next) {
    Director.find().then(objs => res.stauts(200).json({
      msg:"Lista de directores",
      obj:objs
    })).catch(ex => res.status(500).json({
      msg: "No se pudo consultar la lista de directores",
      obj:ex
    }));
  }

  function index(req, res, next){
    const id=req.params.id;
    Director.findOne({"_id":id}).then(obj => res.stauts(200).json({
      msg:`Director con el id ${id}`,
      obj:obj
    })).catch(ex => res.status(500).json({
      msg: "No se pudo consultar la lista de directores",
      obj:ex
    }));

  }


  function replace (req, res, next){
    const id= req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";

    let director = new Object({
      _name:name,
      _lastName:lastName
    });

    Director.findOneAndUpdate({"_id":id}, director,{new:true})
            .then(obj => res.status(200).json({
              msg: "Director remplazado correctamente",
              obj:obj
            })).catch(ex => res.status(500).json({
              msg: "No se pudo remplazar el director correctamente",
              obj:ex
            }));


  }

  function update(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;

    let director = new Object();
    if (name) director._name=name;
    if(lastName)director._lastName=lastName;

    Director.findOneAndUpdate({"_id":id}, director).then(obj => res.status(200).json({
      msg:"Director actualizado correctamente",
      obj:obj
    })).catch(ex => res.status(500).json({
      msg: "No se pudo remplazar el director correctamente",
      obj:ex
    }));

  }

  function destroy(req, res, next){
    const id =req.params.id;
    Director.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
      masg:"Director eliminado correctamente",
      obj: obj

    })).catch(ex => res.status(500).json({
      msg: "No se pudo eliminar el director",
      obj:ex
    }));

  }

  module.exports={
    create,list, index, replace, update, destroy
  };