const express = require('express');
const Actor = require('../models/actor')

function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;
    let actor = new Actor({
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
referencias: equivalente d e la relacion de uno a muchos.
*/
    actor.save().then(obj => res.status(200).json({
      msg:"Actor creado correctamente", 
      obj:obj
    })).catch(ex => res.status(500).json({
      msg:"No se pudo almacenar el actor",
      obj:ex
    }));
}

function list(req, res, next) {
    Actor.find().then(objs => res.stauts(200).json({
      msg:"Lista de actores",
      obj:objs
    })).catch(ex => res.status(500).json({
      msg: "No se pudo consultar la lista de actores",
      obj:ex
    }));
  }

  function index(req, res, next){
    const id=req.params.id;
    Actor.findOne({"_id":id}).then(obj => res.stauts(200).json({
      msg:`Actor con el id ${id}`,
      obj:obj
    })).catch(ex => res.status(500).json({
      msg: "No se pudo consultar la lista de actores",
      obj:ex
    }));

  }


  function replace (req, res, next){
    const id= req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";

    let actor = new Object({
      _name:name,
      _lastName:lastName
    });

    Actor.findOneAndUpdate({"_id":id}, actor,{new:true})
            .then(obj => res.status(200).json({
              msg: "Actor remplazado correctamente",
              obj:obj
            })).catch(ex => res.status(500).json({
              msg: "No se pudo remplazar el actor correctamente",
              obj:ex
            }));


  }

  function update(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;

    let actor = new Object();
    if (name) actor._name=name;
    if(lastName)actor._lastName=lastName;

    Actor.findOneAndUpdate({"_id":id}, actor).then(obj => res.status(200).json({
      msg:"Actor actualizado correctamente",
      obj:obj
    })).catch(ex => res.status(500).json({
      msg: "No se pudo remplazar el actor correctamente",
      obj:ex
    }));

  }

  function destroy(req, res, next){
    const id =req.params.id;
    Actor.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
      msg:"Actor eliminado correctamente",
      obj: obj

    })).catch(ex => res.status(500).json({
      msg: "No se pudo eliminar el actor",
      obj:ex
    }));

  }

  module.exports={
    create,list, index, replace, update, destroy
  };