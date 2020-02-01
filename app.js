const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const helmet = require('helmet');

dotenv.config();

const { PORT = 8001, HOSTNAME = 'localhost' } = process.env;

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(
    morgan('common', {
      // log 400s and 500s only
      skip: (req, res) => res.statusCode < 400,
      stream: `${__dirname}/../morgan.log`
    })
  );
} else {
  app.use(morgan('dev'));
}

app.use(helmet());

app.use(express.json());

app.use('/api/muvis', routes);

app.listen(PORT, () => console.log(`Server listening on http://${HOSTNAME}:${PORT}`));
