const moviesDB = require('./db');
const { getMoviesData } = require('./api');
const { selectMoviesData } = require('./parser');
const { fileNotExists } = require('./utils');
const path = require('path');

const dbPath = path.join(__dirname, '/movies.json');

async function seedDB(req, resp, next) {
  //the db doesn't exists or is empty
  if (fileNotExists(dbPath) || moviesDB.get('movies').isEmpty().value()) {
    console.log('Seding the movies database...');
    const [movies, genresList] = await getMoviesData();
    const parseredMoviesData = selectMoviesData(movies, genresList);
    parseredMoviesData.forEach((movie) => moviesDB.addMovie(movie));
  }
  next();
}

module.exports = seedDB;
