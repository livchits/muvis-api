import { capitalize } from './utils';

function generateNewId(db) {
  const moviesList = db.getMovies().value();
  const moviesIds = moviesList.map((movie) => movie.id);
  const newId = Math.max(...moviesIds) + 1;
  return newId;
}

function findMovieById(db, id) {
  const moviesList = db.getMovies();
  const movieWithId = moviesList.find({ id: Number(id) }).value();
  return movieWithId;
}

function getGenres(db) {
  const moviesList = db.getMovies().value();
  const genresList = moviesList.reduce((genres, movie) => {
    return genres.concat(movie.genres);
  }, []);
  const genresUnique = [...new Set(genresList)];
  return genresUnique.sort((a, b) => a.localeCompare(b));
}

function getYears(db) {
  const moviesList = db.getMovies().value();
  const yearsList = moviesList.map((movie) =>
    new Date(movie.date).getFullYear()
  );
  const yearsUnique = Array.from(new Set(yearsList));
  return yearsUnique.sort((yearOne, yearTwo) => yearOne - yearTwo);
}

function getRates(db) {
  const moviesList = db.getMovies().value();
  const ratesList = moviesList.map((movie) => Number(movie.rate));
  const ratesUnique = Array.from(new Set(ratesList));
  return ratesUnique.sort((a, b) => a - b);
}

function getMoviesWithYear(db, year) {
  const moviesList = db.getMovies().value();
  const moviesWithYear = moviesList.filter(
    (movie) => Number(year) === new Date(movie.date).getFullYear()
  );
  return moviesWithYear;
}

function getMoviesWithGenre(db, genre) {
  const genreToSearch = capitalize(genre);
  const moviesList = db.getMovies().value();
  const moviesWithGenre = moviesList.filter((movie) =>
    movie.genres.includes(genreToSearch)
  );
  return moviesWithGenre;
}

const sortBy = {
  title: function (movieOne, movieTwo) {
    return movieOne.title.localeCompare(movieTwo.title);
  },
  year: function (movieOne, movieTwo) {
    const movieOneYear = new Date(movieOne.date).getFullYear();
    const movierTwoYear = new Date(movieTwo.date).getFullYear();
    return movieOneYear - movierTwoYear;
  },
  rate: function (movieOne, movieTwo) {
    return Number(movieOne.rate) - Number(movieTwo.rate);
  },
};

function getMoviesSortedBy(db, criteria) {
  const moviesList = db.getMovies().value();
  return moviesList.sort(sortBy[criteria]);
}

function getQuery(db, query) {
  const [criteriaReceived] = Object.keys(query);
  const criteria = criteriaReceived.toLowerCase();
  const [value] = Object.values(query);

  if (criteria === 'year') {
    return getMoviesWithYear(db, value);
  }
  if (criteria === 'genre') {
    return getMoviesWithGenre(db, value);
  }
  if (criteria === 'sortby') {
    return getMoviesSortedBy(db, value);
  }
}

module.exports = {
  findMovieById,
  generateNewId,
  getGenres,
  getYears,
  getRates,
  getQuery,
};
