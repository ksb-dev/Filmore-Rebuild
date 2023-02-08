export const APIs = {
  popular_movies_url: `https://api.themoviedb.org/3/discover/movie?api_key=${
    import.meta.env.VITE_KEY
  }&language=en-US&sort_by=popularity.desc`,

  upcoming_movies_url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${
    import.meta.env.VITE_KEY
  }&language=en-US`,

  topRated_movies_url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${
    import.meta.env.VITE_KEY
  }&language=en-US`,

  popular_tv_url: `https://api.themoviedb.org/3/tv/popular?api_key=${
    import.meta.env.VITE_KEY
  }&language=en-US`,

  topRated_tv_url: `https://api.themoviedb.org/3/tv/top_rated?api_key=${
    import.meta.env.VITE_KEY
  }&language=en-US`,

  onAir_tv_url: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${
    import.meta.env.VITE_KEY
  }&language=en-US`,

  no_image_url:
    'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png',
  img_path: 'https://image.tmdb.org/t/p/w1280',

  imdb_url: `https://www/imdb.com/title/`,

  search__url: `https://api.themoviedb.org/3/search/movie?api_key=${
    import.meta.env.VITE_KEY
  }`,

  //https://api.themoviedb.org/3/discover/movie?with_genres=12&page=1&api_key=732dfe94c237f44327af913ebba97825

  login_url: `/url/api/v1/filmora/auth/login`,
  register_url: `/url/api/v1/filmora/auth/register`,

  get_movies_url: `/url/api/v1/filmora/movies`,
  add_movie_url: `/url/api/v1/filmora/movies`,
  delete_movie_url: `/url/api/v1/filmora/movies/`,

  get_shows_url: `/url/api/v1/filmora/shows`,
  add_show_url: `/url/api/v1/filmora/shows`,
  delete_show_url: `/url/api/v1/filmora/shows/`

  // login_url: `/api/v1/filmora/auth/login`,
  // register_url: `/api/v1/filmora/auth/register`,
  // watchlist_url: `/api/v1/filmora/watchlist`,
  // add_watchlist_url: `/api/v1/filmora/watchlist`,
  // delete_watchlist_url: `/api/v1/filmora/watchlist/`
}
