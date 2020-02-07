const Ajv = require('ajv');
const ajv = new Ajv({ useDefaults: 'empty', removeAdditional: true });
const isValid = require('date-fns/isValid');
const isWithinInterval = require('date-fns/isWithinInterval');

const schema = {
  additionalProperties: false,
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    overview: { type: 'string' },
    date: {
      type: 'string',
      format: 'date'
    },
    genres: { type: 'array', minItems: 1, items: { type: 'string' } },
    poster: {
      type: 'string',
      format: 'uri-reference',
      default: 'https://via.placeholder.com/1280x1920.jpg'
    },
    backdrop: {
      type: 'string',
      format: 'uri-reference',
      default: 'https://via.placeholder.com/1280x720.jpg'
    },
    rate: { type: 'number' }
  }
};

function isValidDate(date) {
  const dateObject = new Date(date);
  return (
    isValid(dateObject) &&
    isWithinInterval(dateObject, {
      start: new Date(1880, 0, 1),
      end: new Date()
    })
  );
}

const validate = ajv.addFormat('date', { validate: dateString => isValidDate(dateString) }).compile(schema);

module.exports = validate;
