import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// APIs
import { APIs } from '../../../APIs/APIs'

const initialState = {
  savedMovies: [],
  loading: false,
  error: {
    msg: '',
    isError: false
  },
  user: ''
}

export const setSavedMovies = createAsyncThunk(
  'savedMovies/setSavedMovies',
  async () => {
    const savedToken = sessionStorage.getItem('token')
    let response = ''

    if (savedToken) {
      response = await axios.get(APIs.get_movies_url, {
        headers: {
          Authorization: `Bearer ${savedToken}`
        }
      })
    }
    return response.data.movies
  }
)

export const movieSlice = createSlice({
  name: 'savedMovies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setSavedMovies.pending, state => {
        state.loading = true
        state.error.msg = ''
        state.error.isError = false
      })
      .addCase(setSavedMovies.fulfilled, (state, action) => {
        state.loading = false
        state.error.msg = ''
        state.error.isError = false
        state.savedMovies = action.payload

        state.user = sessionStorage.getItem('name')
      })
      .addCase(setSavedMovies.rejected, state => {
        state.savedMovies = []
        state.loading = false
        state.error.isError = true
        state.error.msg = 'Failed to fetch Wishlists'

        state.user = ''
      })
  }
})

export default movieSlice.reducer
