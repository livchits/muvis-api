const express = require('express');
const router = express.Router();
const { getMovies } = require('../db');

router.get('/', (req, res) => {
  res.json(getMovies());
});

router.route('/:id').get((req, res, next) => {
  const { id } = req.params;
  const movie = findMovieById(id);
  if (movie) {
    res.json(movie);
  } else {
    const err = new Error(`404 - The movie with the id ${id} was not found`);
    err.status = 404;
    next(err);
  }
});

module.exports = router;
