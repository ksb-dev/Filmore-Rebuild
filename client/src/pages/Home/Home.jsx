import React, { useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'
import { getMovies } from '../../redux/services/getMovies'
import { getTvShows } from '../../redux/services/getTvShows'
import { setWatchlist } from '../../redux/services/setWatchlist'

// context
import { useMovieContext } from '../../context/context'

// components
import Header from '../../components/Header/Header'
import MovieList from '../../components/MovieList/MovieList'
import TvList from '../../components/TvList/TvList'

const Home = () => {
  const { mode, movieState, setMovieState } = useMovieContext()
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

    movieState
      ? dispatch(getMovies('popular'))
      : dispatch(getTvShows('popular'))
  }, [dispatch, movieState])

  return (
    <div
      className={
        'home ' + (mode === true ? 'lightBg1 darColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
      {movieState ? <MovieList /> : <TvList />}
    </div>
  )
}

export default Home
