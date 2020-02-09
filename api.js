const got = require('got');

const { API_KEY, TOP_RATED_URL, GENRES_URL } = process.env;

async function getMovies(page, array) {
  try {
    if (array.length < 100) {
      const { body } = await got(`${TOP_RATED_URL}${API_KEY}&page=${page}`, {
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

module.exports = { getMovies, getGenres, queryApi };
//module.exports = queryApi(getMovies(1, []), getGenres());
