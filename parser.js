function selectMoviesData(movies, genresIdsAndNamesList) {
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
      genres: mapIdsToGenres(genres, genresIdsAndNamesList),
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

function mapIdsToGenres(genresIds, genresIdsAndNamesList) {
  const genresNames = genresIds.map(id => {
    genresIdsAndNamesList.forEach(genre => {
      if (genre.id === id) {
        id = genre.name;
      }
    });
    return id; //se devuelve el id
  });
  return genresNames;
}

module.exports = { changeGenresIDsforNames, selectMoviesData };
