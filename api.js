const got = require('got');
const dotenv = require('dotenv');

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
    console.error(error.response.body);
  }
}

async function getGenres() {
  try {
    const { body } = await got(`${GENRES_URL}${API_KEY}`, {
      responseType: 'json',
    });
    return body.genres;
  } catch (error) {
    console.error(error.response.body);
  }
}

async function queryApi(...requests) {
  try {
    const responses = await Promise.all(requests);
    return responses;
  } catch (error) {
    console.error(error.message);
  }
}

async function getMoviesData() {
  try {
    const moviesData = await queryApi(getApiMovies(1, []), getGenres());
    return moviesData;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { getMoviesData };
