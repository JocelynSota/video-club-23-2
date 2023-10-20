const mongoose = require('mongoose');

// Schema: Estructura que representa la coneccione que se encuentra en la base de datos
const schema = mongoose.Schema({
    _description:String,
    _status:Number
});
// Clase: Para los objetos
class Genre {
    constructor(description, status){
        this._description = description;
        this._status = status;
    }

    get description(){
        return this._description;
    }
    set description(v){
        this._description = v;
    }
    get status(){
        return this._status;
    }
    set status(v){
        this._status = v;
    }
}

schema.loadClass(Genre);
module.exports = mongoose.model('Genre', schema);