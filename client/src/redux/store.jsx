import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './services/movies/getMovies'
import savedMoviesReducer from './services/movies/setSavedMovies'
import tvReducer from './services/shows/getTvShows'
import savedShowsReducer from './services/shows/setSavedShows'

export default configureStore({
  reducer: {
    movies: movieReducer,
    savedMovies: savedMoviesReducer,
    tvShows: tvReducer,
    savedShows: savedMoviesReducer
  }
})
