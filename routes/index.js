const express = require('express');
const router = express.Router();
const moviesDb = require('../db');
const { getQuery, getGenres, getYears, getRates } = require('../movies');
const { validationResult } = require('express-validator');
const { postValidation } = require('../validations');

router
  .route('/')
  .get((req, res) => {
    if (Object.keys(req.query).length) {
      const response = getQuery(moviesDb, req.query);
      return res.json(response);
    }
    res.json(moviesDb.getMovies());
  })
  .post(postValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsMessages = errors.array().reduce((acc, cur) => {
        acc.push(cur.msg);
        return acc;
      }, []);

      const err = new Error(errorsMessages.join(' | '));
      err.status = 400;
      return next(err);
    }

    const newMovie = moviesDb.addMovie(req.body);
    res.json(newMovie);
  });

router.route('/genres').get((req, res) => {
  res.json(getGenres(moviesDb));
});

router.route('/years').get((req, res) => {
  res.json(getYears(moviesDb));
});

router.route('/rates').get((req, res) => {
  res.json(getRates(moviesDb));
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
