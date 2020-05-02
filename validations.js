const { isValidDate } = require('./ajv');
const { check, validationResult } = require('express-validator');
const { capitalize, formatDate } = require('./utils');

const postValidation = [
  check('title')
    .isLength({ min: 2 })
    .withMessage('Name must have more than 5 characters.'),
  check('date')
    .custom((value) => {
      if (!isValidDate(value))
        throw new Error(
          'Movie date is required and should be in yyyy-mm-dd format.'
        );
      return true;
    })
    .customSanitizer((value) => formatDate(value)),
  check('overview')
    .isLength({ min: 50 })
    .withMessage(
      'Movie description is required and should have minimum 50 characters.'
    ),
  check('rate')
    .isNumeric({ min: 1, max: 10 })
    .withMessage(
      'Movie rate is required and should be a number between 1 and 10.'
    ),
  check('genres')
    .custom(
      (data) =>
        Array.isArray(data) &&
        data.every((genre) =>
          [
            'action',
            'adventure',
            'animation',
            'comedy',
            'crime',
            'documentary',
            'drama',
            'family',
            'fantasy',
            'history',
            'horror',
            'music',
            'mistery',
            'romance',
            'science fiction',
            'tv movie',
            'thriller',
            'war',
            'western',
          ].includes(genre.toLowerCase())
        )
    )
    .customSanitizer((value) => value.map((genre) => capitalize(genre)))
    .withMessage('Movie genre is required.'),
];
