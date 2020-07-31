const got = require('got');
const dotenv = require('dotenv');
const { selectMoviesData } = require('./parser');
const { addMovie } = require('./db');

dotenv.config();

const { API_KEY, TOP_RATED_URL, GENRES_URL } = process.env;

async function getApiMovies(page, array) {
  try {
    if (array.length < 100) {
      const { body } = await got(`${TOP_RATED_URL}${API_KEY}&page=${page}`, {
        responseType: 'json',
      });
      array = array.concat(body.results);
      return getApiMovies(page++, array);
    }
    return array;
  } catch (error) {
    console.log(error.response.body);
  }
}

async function getGenres() {
  try {
    const { body } = await got(`${GENRES_URL}${API_KEY}`, {
      responseType: 'json',
    });
    return body.genres;
  } catch (error) {
    console.log(error.response.body);
  }
}

async function queryApi(...requests) {
  try {
    const responses = await Promise.all(requests);
    return responses;
  } catch (error) {
    console.log(error.message);
  }
}

function getMoviesData() {
  return queryApi(getApiMovies(1, []), getGenres()) //no hace falta asignarlo a una variable y exportarlo luego
    .then((responses) => {
      const [movies, genresList] = responses;
      return selectMoviesData(movies, genresList);
    })
    .then((data) => {
      //console.log(data.length);
      //console.log(data[0]);
      data.forEach((movie) => addMovie(movie));
    })
    .catch((e) => console.log('error', e));
}

module.exports = { getMoviesData };
