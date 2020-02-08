const express = require('express');
const router = express.Router();
const { getMovies } = require('../db');

router.get('/', (req, res) => {
  res.json(getMovies());
});

module.exports = router;
