import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './Services/getMovies'
import watchlistReducer from './Services/setWatchlist'
import tvReducer from './services/getTvShows'

export default configureStore({
  reducer: {
    movies: movieReducer,
    watchlist: watchlistReducer,
    tvShows: tvReducer
  }
})
