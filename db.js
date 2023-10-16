const Sequelize = require("sequelize");

const directorModel= require('./models/director');
const genreModel =require('./models/genre');
const movieModel = require('./models/movie');
const actorModel = require('./models/actor');
const memberModel = require('./models/member');
const movieActorModel = require('./models/movieActor');
const bookingModel = require('./models/booking');
const copyModel = require('./models/copy');


/*

1)NOmbre de la base de datos
2)Usuario
3) Constraseña
4)Objeto de configuraciòn ORM

*/

const sequelize= new Sequelize('videoclub', 'root','abcd1234',{
    host: '127.0.0.1',
    port: 3307,
    dialect: 'mysql'
});

const Director =directorModel(sequelize, Sequelize);
const Genre =genreModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const Member = memberModel(sequelize, Sequelize);
const MovieActor = movieActorModel(sequelize, Sequelize);
const Booking = bookingModel(sequelize, Sequelize);
const Copy= copyModel(sequelize, Sequelize);




//Un genero puede tener muchas peliculas
Genre.hasMany(Movie,{as:'movies'});
//Una pelicula tiene un genero
Movie.belongsTo(Genre, {as:'genre'});

//un director puede tener muchas peliculas
Director.hasMany(Movie,{as:'movies'});
//Una pelicula tiene un director
Movie.belongsTo(Director, {as:'director'});

//Un actor participa en muchas peliculas
MovieActor.belongsTo(Movie,{foreignKey:'movieId'});

//En una pelicula participan muchos actores
MovieActor.belongsTo(Actor,{foreignKey:'actorId'});

Movie.belongsToMany(Actor, {
    foreignKey: 'actorId',
    as: 'actors',
    through: 'movies_actors'
});

Actor.belongsToMany(Movie, {
    foreignKey: 'movieId',
    as:'movies',
    through: 'movies_actors'
});

//Una pelicula puede tener muchas copias
Movie.hasMany(Copy, {as: 'copies'});

//Una copia solo puede ser de una pelicula
Copy.belongsTo(Movie, {as: 'movie'});

//Una copia puede tener muchas reservas 
Copy.hasMany(Booking, {as: 'bookings'});

//Una reserva solo puede ser de una copia
Booking.belongsTo(Copy, {as: 'copy'});

//Un miembro solo puede tener muchas reservas
Member.hasMany(Booking, {as: 'bookings'});

//Una reserva solo pertenece a un miembro
Booking.belongsTo(Member, {as: 'member'});


sequelize.sync({
    force:true
}).then(()=>{
    console.log('Base de datos sincronizada');
});

module.exports = { Director, Genre, Movie, Actor, Member, Copy, Booking };

