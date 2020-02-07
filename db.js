const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

function createDb() {
  const adapter = new FileSync('movies.json');
  const db = low(adapter);

  db.defaults({ movies: [] }).write();

  return db;
}

function addMovie(db, movie) {
  if (validate(movie)) {
    db.get('movies')
      .push(movie)
      .write();
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
