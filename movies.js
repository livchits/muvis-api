const { getMovies } = require('./db');

function findMovieById(id) {
  const moviesList = getMovies();
  const movieWithId = moviesList.find({ id: Number(id) });
  return movieWithId;
}

module.exports = { findMovieById };
