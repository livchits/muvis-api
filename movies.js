import { capitalize } from './utils';

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

function getYears(db) {
  const moviesList = db.getMovies().value();
  const datesList = moviesList.reduce((years, movie) => {
    years.push(movie.date);
    return years;
  }, []);

  const yearsList = datesList.map((date) => new Date(date).getFullYear());
  const yearsUnique = Array.from(new Set(yearsList));
  return yearsUnique.sort((a, b) => a - b);
}

function getRates(db) {
  const moviesList = db.getMovies().value();
  const ratesList = moviesList.reduce((rates, movie) => {
    rates.push(movie.rate);
    return rates;
  }, []);

  const ratesNumbers = ratesList.map((rate) => Number(rate));
  const ratesUnique = Array.from(new Set(ratesNumbers));
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
  const [criteria] = Object.keys(query);
  const [value] = Object.values(query);

  if (criteria === 'year') {
    return getMoviesWithYear(db, value);
  }
  if (criteria === 'genre') {
    return getMoviesWithGenre(db, value);
  }
  if (criteria === 'sortBy') {
    return getMoviesSortedBy(db, value);
  }
}

module.exports = {
  findMovieById,
  generateNewId,
  getGenres,
  getYears,
  getRates,
  getMoviesWithYear,
  getMoviesWithGenre,
};
