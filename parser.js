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

    const formatedDate = formatDate(date);

    return {
      id,
      title,
      overview,
      date: formatedDate,
      genres,
      poster: `https://image.tmdb.org/t/p/w1280${poster}`,
      backdrop: `https://image.tmdb.org/t/p/w1280${backdrop}`,
      rate
    };
  });

  return dataSelected;
}
