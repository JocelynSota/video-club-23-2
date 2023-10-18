const express = require('express');
const Director = require('../models/director')

function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;
    let director = new Director({
        name:name,
        lastName:lastName
    });
}

function list(req, res, next) {
    res.send('Directors list');
  }

  function index(req, res, nextex){
    res.send('Directors index');

  }


  function replace (req, res, nextex){
    res.send('Directors replace');

  }

  function update(req, res, nextex){
    res.send('Directors update');

  }

  function destroy(req, res, nextex){
    res.send('Directors destroy');

  }

  module.exports={
    create,list, index, replace, update, destroy
  };