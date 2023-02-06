import React, { useEffect } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getMovies } from '../../redux/services/getMovies'
import { setWatchlist } from '../../redux/services/setWatchlist'

// Context
import { useMovieContext } from '../../context/context'

// components
import Header from '../../components/Header/Header'
import MovieList from '../../components/MovieList/MovieList'

const Home = () => {
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
      dispatch(setWatchlist())
    }

    dispatch(getMovies('popular'))
  }, [dispatch])

  return (
    <div
      className={
        'home ' + (mode === true ? 'lightBg1 darColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
      <MovieList />
    </div>
  )
}

export default Home
