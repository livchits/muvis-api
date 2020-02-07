const dotenv = require('dotenv');
const got = require('got');

dotenv.config();

const BASE_URL = 'https://api.themoviedb.org/3/movie/top_rated?api_key=';
const GENRES_URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=';
const { API_KEY } = process.env;

const movies = [];

async function getMovies(page, array) {
  try {
    if (array.length < 100) {
      const { body } = await got(`${BASE_URL}${API_KEY}&page=${page}`, {
        responseType: 'json'
      });
      array = array.concat(body.results);
      return getMovies(page++, array);
    }
    return array;
  } catch (error) {
    console.log(error.response.body);
  }
}

async function getGenres() {
  try {
    const { body } = await got(`${GENRES_URL}${API_KEY}`, {
      responseType: 'json'
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
