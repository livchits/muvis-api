const dotenv = require('dotenv');
const got = require('got');

dotenv.config();

const BASE_URL = 'https://api.themoviedb.org/3/movie/top_rated?';
const { API_KEY } = process.env;

const movies = [];

async function getMovies(page) {
  try {
    const { results } = await got(`${BASE_URL}api_key=${API_KEY}&language=en-US&page=${page}`);
  } catch (error) {
    console.log(error.response.body);
  }
}

//api_key=15a4898f026589678060ac18735a6d7a&language=en-US&page=1
