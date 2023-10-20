const mongoose = require('mongoose');

// Schema: Estructura que representa la coneccione que se encuentra en la base de datos
const schema = mongoose.Schema({
    _name:String,
    _lastName:String
});
// Clase: Para los objetos
class Actor {
    constructor(name, lastName){
        this._name = name;
        this._lastName = lastName;
    }

    get name(){
        return this._name;
    }
    set name(v){
        this._name = v;
    }
    get lastName(){
        return this._lastName;
    }
    set lastName(v){
        this._lastName = v;
    }
}

schema.loadClass(Actor);
module.exports = mongoose.model('Actor', schema);