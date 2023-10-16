module.exports = (sequelize, type) => {
    const Genre = sequelize.define('genres', { // genres es el nombre en la base de datos
        id: {type: type.INTEGER, primaryKey:true, autoIncrement: true},
        description: type.STRING,
        status: type.BOOLEAN 
    });
    return Genre;
};