import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './Services/getMovies'
import watchlistReducer from './Services/setWatchlist'

export default configureStore({
  reducer: {
    movies: movieReducer,
    watchlist: watchlistReducer
  }
})
