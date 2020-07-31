# Muvis API

This API is an excersice to put in practice the REST concepts and create an app with Express in Node. In first place, the server consume [The Movie DB API](https://www.themoviedb.org/documentation/api) to generate a new database of movies. Then, the app expose some endpoints to make CRUD operations with the data.

## Use of the project

The API can be use through this URL:

To install it in your one server, you have to clone this repositorie:

`git clone ...`

Go to the project's directory and install the dependencies:

```
cd muvis-api
npm install
```

Create an `.env` and edit it like this:

```
HOSTNAME=localhost
PORT=3000
API_KEY=YOUR_API_KEY
TOP_RATED_URL=https://api.themoviedb.org/3/movie/top_rated?api_key=
GENRES_URL=https://api.themoviedb.org/3/genre/movie/list?api_key=
```

And don't forget to replace the `API_KEY` value with your key. To get one in The Movie DB site you have to create an account there (it's free).

Finally run:

`npm run start`

Now you can acces the endpoints at `localhost:3000/api`

## Endpoints

## Accepted query strings

## Movie example

## Accepted JSON object for PUT and POST requests:

## Used technologies

- NodeJS
- Express
- LowDB
- Express Validator
- Ajv Validator
