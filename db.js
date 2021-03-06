const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { validate } = require('./jsonValidation');
const { generateNewId } = require('./queryMovies');
const { formatDate } = require('./utils');

function createDb() {
  const adapter = new FileSync('movies.json');
  const db = low(adapter);

  db.defaults({ movies: [] }).write();

  db._.prototype.addMovie = function (movie) {
    const { title, date, overview, rate, genres, poster, backdrop, id } = movie;

    const newMovie = {
      title,
      date,
      overview,
      rate: Number(rate),
      genres,
      poster,
      backdrop,
      id: id || generateNewId(db),
    };

    if (validate(newMovie)) {
      db.get('movies').push(newMovie).write();
      return newMovie;
    } else {
      console.error(validate.errors);
    }
  };

  db._.prototype.getMovies = function () {
    return this.read().get('movies');
  };

  db._.prototype.removeMovie = function (id) {
    this.get('movies').remove({ id: id }).write();
  };

  db._.prototype.updateMovie = function (newMovieData, movieToUpdate) {
    newMovieData.date = formatDate(newMovieData.date);
    const keysToUpdate = Object.keys(newMovieData); //array de las props a actualizar
    const movieDataToUpdate = movieToUpdate.value();
    keysToUpdate.forEach((key) => {
      this.get('movies')
        .find({ [key]: movieDataToUpdate[key] })
        .assign({ [key]: newMovieData[key] })
        .write();
    });
  };

  db._.prototype.isDbEmpty = function () {
    return db.get('movies').isEmpty().value();
  };

  return db;
}

const moviesDb = createDb();

module.exports = moviesDb;
