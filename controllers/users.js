const express = require('express');

function create(req, res, next){
    res.send('Users create');

  }

function list(req, res, next) {
    res.send('Users list');
  }

  function index(req, res, nextex){
    res.send('Users index');

  }


  function replace (req, res, nextex){
    res.send('Users replace');

  }

  function update(req, res, nextex){
    res.send('Users update');

  }

  function destroy(req, res, nextex){
    res.send('Users destroy');

  }

  



  module.exports={
    create,list, index, replace, update, destroy
  };