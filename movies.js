const { getMovies } = require('./db');

function findMovieById(id) {
  const moviesList = getMovies();
  //const movieWithId = moviesList.find({ id: Number(id) }).value(); //trabaja con el lodash wrapper y devuelve un objeto
  const movieWithId = moviesList.find(movie => movie.id === Number(id)); // trabaja con el array

  return movieWithId;
}

module.exports = { findMovieById };
