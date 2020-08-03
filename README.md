# Muvis API

This API is an [excercise](https://github.com/undefinedschool/project-5-muvis-api) to put in practice the REST concepts and create an app with Express in Node. In first place, the server consumes [The Movie DB API](https://www.themoviedb.org/documentation/api) to generate a new database of movies. Then, the app expose some endpoints to make CRUD operations with the data.

## Use of the project

The API can be use at this URL: https://muvis-api.herokuapp.com/api/

To install it in your own server, you have to clone this repositorie:

`git clone ...`

Go to the project's directory and install the dependencies:

```
cd muvis-api
npm install
```

Create an `.env` file and edit it like this:

```
HOSTNAME=localhost
PORT=3000
API_KEY=YOUR_API_KEY
TOP_RATED_URL=https://api.themoviedb.org/3/movie/top_rated?api_key=
GENRES_URL=https://api.themoviedb.org/3/genre/movie/list?api_key=
```

Don't forget to replace the `API_KEY` value with your key. To get one in The Movie DB site you have to create an account there.

Finally run:

`npm run start`

Now you can access the API at `localhost:3000/api`

## Endpoints

| Method | Endpoint            | Usage                                                                               | Returns |
| ------ | ------------------- | ----------------------------------------------------------------------------------- | ------- |
| GET    | `/api/muvis`        | 100 movies in `json` format                                                         | Movies  |
| POST   | `/api/muvis`        | Adds a new movie and returns the added movie. They payload must be in `json` format | Movie   |
| GET    | `/api/muvis/:id`    | Get a movie                                                                         | Movie   |
| PUT    | `/api/muvis/:id`    | Modify a movie with specified ID                                                    | Movie   |
| DELETE | `/api/muvis/:id`    | Delete a movie with specified ID                                                    | Movies  |
| GET    | `/api/muvis/years`  | Get the list of movie's years                                                       | Years   |
| GET    | `/api/muvis/rates`  | Get the list of movie's rates                                                       | Rates   |
| GET    | `/api/muvis/genres` | Get the list of movie's genres                                                      | Genres  |

## Query strings

| Method | Endpoint     | Query string    | Usage                                             |
| ------ | ------------ | --------------- | ------------------------------------------------- |
| GET    | `/api/muvis` | `?year=1972`    | Get the list of movies released that year         |
| GET    | `/api/muvis` | `?genre=drama`  | Get the list of movies with requested genre       |
| GET    | `/api/muvis` | `?sortBy=title` | Get the movies sorted by title in ascending order |
| GET    | `/api/muvis` | `?sortBy=year`  | Get the movies sorted by year in ascending order  |
| GET    | `/api/muvis` | `?sortBy=rate`  | Get the movies sorted by rate in ascending order  |

## Movie example

```json
{
  "title": "The Godfather",
  "date": "March 14, 1972",
  "overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
  "rate": 8.7,
  "genres": ["Crime", "Drama"],
  "poster": "https://image.tmdb.org/t/p/w1280/iVZ3JAcAjmguGPnRNfWFOtLHOuY.jpg",
  "backdrop": "https://image.tmdb.org/t/p/w1280/ejdD20cdHNFAYAN2DlqPToXKyzx.jpg",
  "id": 238
}
```

## Accepted JSON object for PUT and POST requests:

```json
{
  "title": "Pulp Fiction",
  "date": "September 10, 1994",
  "overview": "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
  "rate": 8.5,
  "genres": ["Crime", "Thriller"],
  "poster": "https://image.tmdb.org/t/p/w1280/yAaf4ybTENKPicqzsAoW6Emxrag.jpg",
  "backdrop": "https://image.tmdb.org/t/p/w1280/eDMZmfnH50DDboUxTRnOYYpE9aY.jpg"
}
```

## Used technologies

- NodeJS
- Express
- LowDB
- Express Validator
- Ajv Validator
