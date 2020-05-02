const express = require('express');
const router = express.Router();
const { getApiMovies } = require('../db');

router.get('/', (req, res) => {
  res.json(getApiMovies()); //chequear que efectivamente la api devuelva las películas o agregar un .value()
});

router.route('/:id').get((req, res, next) => {
  const { id } = req.params;
  const movie = findMovieById(id);
  if (movie) {
    res.json(movie); //chequear que efectivamente la api devuelva al película o modificar findMovieById
  } else {
    const err = new Error(`404 - The movie with the id ${id} was not found`);
    err.status = 404;
    next(err);
  }
});

module.exports = router;
