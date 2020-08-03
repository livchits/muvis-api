const express = require('express');
const router = express.Router();
const moviesDb = require('../db');
const {
  getQuery,
  getGenres,
  getYears,
  getRates,
  findMovieById,
} = require('../queryMovies');
const { validationResult } = require('express-validator');
const { postValidation, putValidation } = require('../dataValidations');

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

router
  .route('/:id')
  .get((req, res, next) => {
    const { id } = req.params;
    const movie = findMovieById(moviesDb, id);
    if (movie) {
      return res.json(movie);
    }
    const err = new Error(`404 - The movie with the id ${id} was not found`);
    err.status = 404;
    next(err);
  })
  .put(putValidation, (req, res, next) => {
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

    const { id } = req.params;
    const movieToUpdate = findMovieById(moviesDb, Number(id));
    if (movieToUpdate) {
      moviesDb.updateMovie(req.body, movieToUpdate);
      return res.json({ message: 'ok' });
    }
    const newMovie = moviesDb.addMovie(req.body);
    return res.json(newMovie);
  })
  .delete((req, res, next) => {
    const id = Number(req.params.id);
    const movieToRemove = findMovieById(moviesDb, id);
    if (movieToRemove) {
      moviesDb.removeMovie(id);
      return res.json({ message: `Movie with ID ${id} was deleted` });
    }
    const err = new Error(`404 - The movie with the id ${id} was not found`);
    err.status = 404;
    next(err);
  });

module.exports = router;
