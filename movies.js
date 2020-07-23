function generateNewId(db) {
  const moviesList = db.getMovies().value();

  const moviesIds = moviesList.reduce((ids, movie) => {
    ids.push(movie.id);
    return ids;
  }, []);

  const newId = Math.max(...moviesIds) + 1;
  return newId;
}

function findMovieById(db, id) {
  const moviesList = db.getMovies();
  const movieWithId = moviesList.find({ id: Number(id) });
  return movieWithId;
}

function getGenres(db) {
  const moviesList = db.getMovies().value();

  const genresList = moviesList.reduce((genres, movie) => {
    return genres.concat(movie.genres);
  }, []);

  const genresLowerCase = genresList.map((genre) => genre.toLowerCase()); //necesario si hay inconsistencias por las mayúsculas
  const genresUnique = Array.from(new Set(genresLowerCase));
  return genresUnique.sort((a, b) => a.localeCompare(b));
}

module.exports = { findMovieById, generateNewId, getGenres };
