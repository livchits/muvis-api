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

module.exports = { findMovieById, generateNewId };
