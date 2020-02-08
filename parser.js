function selectMoviesData(movies) {
  const dataSelected = movies.map(movie => {
    const {
      id,
      original_title: title,
      overview,
      release_date: date,
      genre_ids: genres,
      poster_path: poster,
      backdrop_path: backdrop,
      vote_average: rate
    } = movie;

    return {
      id,
      title,
      overview,
      date: formatDate(date),
      genres,
      poster: `https://image.tmdb.org/t/p/w1280${poster}`,
      backdrop: `https://image.tmdb.org/t/p/w1280${backdrop}`,
      rate
    };
  });

  return dataSelected;
}

function formatDate(dateString) {
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const date = new Date(dateString);
  const formatedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return formatedDate;
}

function changeGenresIDsforNames(moviesList, genresIdsAndNamesList) {
  //itera la lista de películas
  moviesList.forEach(movie => {
    //de cada película mapea el array genre_ids
    const genresNames = movie.genre_ids.map(id => {
      //se itera la lista de objetos {id: género}
      genresIdsAndNamesList.forEach(genre => {
        //si el id es igual al del listado de géneros, le asigna el nombre como valor
        if (genre.id === id) {
          id = genre.name;
        }
      });
      return id; //se devuelve el id
    });
    movie.genre_ids = genresNames; //se asigna a la propiedad genres_ids de la película el nuevo array
  });
  return moviesList;
}
