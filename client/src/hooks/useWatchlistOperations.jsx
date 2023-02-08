import { useState } from 'react'
import axios from 'axios'

// APIs
import { APIs } from '../APIs/APIs'

// Redux
import { useDispatch } from 'react-redux'
import { setSavedMovies } from '../redux/services/movies/setSavedMovies'
import { getMovies } from '../redux/services/movies/getMovies'

export const useWatchlistOperations = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const dispatch = useDispatch()

  // Add Watchlist
  const addMovie = async (
    id,
    title,
    poster_path,
    backdrop_path,
    release_date,
    vote_average,
    genre_ids,
    overview
  ) => {
    const token = sessionStorage.getItem('token')

    setError(null)
    setIsPending(true)

    try {
      const response = await axios.post(
        APIs.add_movie_url,
        {
          movie_data: {
            id,
            title,
            poster_path,
            backdrop_path,
            vote_average,
            release_date,
            genre_ids,
            overview
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response) {
        setError(null)
        setIsPending(false)

        dispatch(setSavedMovies())
      }
    } catch (error) {
      setIsPending(false)
      setError('Failed to add to watchlist.')
    }
  }

  // Delete Watchlist
  const deleteMovie = async id => {
    const token = sessionStorage.getItem('token')

    setError(null)
    setIsPending(true)

    try {
      const response = await axios.delete(
        APIs.delete_movie_url + `${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response) {
        setError(null)
        setIsPending(false)

        dispatch(setSavedMovies())

        if (window.location.pathname === '/watchlist') {
          console.log(true)
          dispatch(getMovies('watchlist'))
        }
      }
    } catch (error) {
      setIsPending(false)
      setError('Failed to delete to wishlist.')
    }
  }

  return { addMovie, deleteMovie, isPending, error }
}
