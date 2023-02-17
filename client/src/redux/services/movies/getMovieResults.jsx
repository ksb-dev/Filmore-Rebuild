import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// APIs
import { APIs } from '../../../APIs/APIs'

const initialState = {
  movieResults: [],
  loading: false,
  error: {
    msg: '',
    isError: false
  }
}

export const getMovieResults = createAsyncThunk(
  'movieResults/getMovieResults',

  async value => {
    var data, res

    if (value !== null) {
      data = await fetch(APIs.search__movie__url + `&query=${value}`)
    }

    // const page = sessionStorage.getItem('page')

    // if (value !== null && page === 1) {
    //   data = await fetch(APIs.search__movie__url + `&query=${value}`)
    // } else {
    //   data = await fetch(
    //     APIs.search__movie__url + `&query=${value}&page=${page}`
    //   )
    // }

    res = await data.json()

    return res
  }
)

export const movieResultsSlice = createSlice({
  name: 'movieResults',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMovieResults.pending, state => {
        state.loading = true
        state.error.isError = false
        state.error.msg = ''
      })
      .addCase(getMovieResults.fulfilled, (state, action) => {
        state.loading = false

        if (action.payload.results) {
          state.movieResults = action.payload.results
        } else {
          state.movieResults = action.payload
        }
        state.error.isError = false
      })
      .addCase(getMovieResults.rejected, state => {
        console.log('rejected')
        state.loading = false
        state.error.isError = true
        state.error.msg = 'Failed to fetch movies.'
        state.movieResults = []
      })
  }
})

export default movieResultsSlice.reducer
export const {} = movieResultsSlice.actions
