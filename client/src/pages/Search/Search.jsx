import React, { useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'
import { getMovies } from '../../redux/services/movies/getMovies'
import { getTvShows } from '../../redux/services/shows/getTvShows'
import { setSavedMovies } from '../../redux/services/movies/setSavedMovies'

// context
import { useMovieContext } from '../../context/context'

// components
import Header from '../../components/Header/Header'

const Search = () => {
  const { mode } = useMovieContext()
  const dispatch = useDispatch()

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    const savedToken = sessionStorage.getItem('token')

    if (savedToken !== '' || savedToken !== undefined || savedToken !== null) {
      dispatch(setSavedMovies())
    }

    dispatch(getMovies('upcoming'))
  }, [dispatch])

  return (
    <div
      className={
        'search ' +
        (mode === true ? 'lightBg2 darColor1' : 'darkBg1 lightColor1')
      }
    >
      <Header />
    </div>
  )
}

export default Search
