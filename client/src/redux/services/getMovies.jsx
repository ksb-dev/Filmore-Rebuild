import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// APIs
import { APIs } from '../../APIs/APIs'

const initialState = {
  movies: [],
  sortedMovies: [],
  totalPages: 0,
  loading: false,
  error: {
    msg: '',
    isError: false
  },
  sortState: 'All',
  filterState: 'All'
}

export const getMovies = createAsyncThunk(
  'movies/getMovies',

  async category => {
    const pageNo = Number(sessionStorage.getItem('page'))
    const page = pageNo ? pageNo : 1

    sessionStorage.setItem('page', page)

    var data, res

    if (category === 'popular') {
      if (page === 1) {
        data = await fetch(APIs.popular_movies_url)
      } else {
        data = await fetch(APIs.popular_movies_url + `&page=${page}`)
      }
    } else if (category === 'upcoming') {
      if (page === 1) {
        data = await fetch(APIs.upcoming_movies_url)
      } else {
        data = await fetch(APIs.upcoming_movies_url + `&page=${page}`)
      }
    } else if (category === 'top') {
      if (page === 1) {
        data = await fetch(APIs.topRated_movies_url)
      } else {
        data = await fetch(APIs.topRated_movies_url + `&page=${page}`)
      }
    } else if (category === 'search') {
      const term = sessionStorage.getItem('term')

      data = await fetch(APIs.search__url + `&query=` + term)
    } else {
      const savedToken = sessionStorage.getItem('token')

      if (savedToken) {
        const response = await axios.get(APIs.watchlist_url, {
          headers: {
            Authorization: `Bearer ${savedToken}`
          }
        })
        return response.data.watchlist
      }
    }
    res = await data.json()

    return res
  }
)

const setSortValues = (state, action) => {
  if (action.payload.movies.length > 0) {
    state.sortedMovies = action.payload.movies
    state.sortState = action.payload.sortValue
    state.filterState = 'All'
    state.error.msg = ''
    state.error.isError = false
  } else {
    state.sortedMovies = []
    state.sortState = action.payload.sortValue
    state.filterState = 'All'
    state.error.msg = `No movies found! Please try again later.`
    state.error.isError = true
  }
}

const setFilterValues = (state, action) => {
  if (action.payload.movies.length > 0) {
    state.sortedMovies = action.payload.movies
    state.sortState = 'All'
    state.filterState = action.payload.genre
    state.error.msg = ''
    state.error.isError = false
  } else {
    state.sortedMovies = []
    state.sortState = 'All'
    state.filterState = action.payload.genre
    state.error.msg = `No "${action.payload.genre}" movies found! Click on different genre.`
    state.error.isError = true
  }
}

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    reset: (state, action) => {
      setSortValues(state, action)
    },
    sortAtoZ: (state, action) => {
      setSortValues(state, action)
    },
    sortZtoA: (state, action) => {
      setSortValues(state, action)
    },
    sortOneToTen: (state, action) => {
      setSortValues(state, action)
    },
    sortTenToOne: (state, action) => {
      setSortValues(state, action)
    },
    filterGenre: (state, action) => {
      setFilterValues(state, action)
    },
    setDefault: (state, action) => {
      state.sortState = action.payload
      state.filterState = action.payload
    },
    setMoviesToNull: state => {
      state.movies = []
      state.sortedMovies = []
      state.totalPages = 0
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getMovies.pending, state => {
        state.loading = true
        state.error.isError = false
        state.error.msg = ''
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false

        if (action.payload.results) {
          state.sortedMovies = action.payload.results
          state.movies = action.payload.results
          state.totalPages = action.payload.total_pages
        } else {
          state.sortedMovies = action.payload
          state.movies = action.payload
        }
        state.error.isError = false
      })
      .addCase(getMovies.rejected, state => {
        state.loading = false
        state.error.isError = true
        state.error.msg = 'Failed to fetch movies.'
        state.movies = []
        state.sortedMovies = []
        state.totalPages = 0
      })
  }
})

export default moviesSlice.reducer
export const {
  reset,
  sortAtoZ,
  sortZtoA,
  sortOneToTen,
  sortTenToOne,
  filterGenre,
  setDefault,
  setMoviesToNull
} = moviesSlice.actions
