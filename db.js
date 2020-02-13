const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const validate = require('./ajv');

function createDb() {
  const adapter = new FileSync('movies.json');
  const db = low(adapter);

  db.defaults({ movies: [] }).write();

  return db;
}

function addMovie(db, { title, date, overview, rate, genres, id }) {
  const newMovie = {
    title,
    date,
    overview,
    rate: Number(rate),
    genres,
    id: id || generateNewId()
  };

  if (validate(newMovie)) {
    db.get('movies')
      .push(newMovie)
      .write();
    return newMovie;
  } else {
    console.error(validate.errors);
  }
}

function getMovies() {
  const movies = createDb()
    .read()
    .get('movies')
    .value(); //devuelve el array
  //const movies = createDb().read().get('movies'); //devuelve un lodash wrapper
  return movies;
}

module.exports = { createDb, addMovie, getMovies };
