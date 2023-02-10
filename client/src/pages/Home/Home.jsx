import React, { useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'
import { getMovies } from '../../redux/services/movies/getMovies'
import { getTvShows } from '../../redux/services/shows/getTvShows'
import { setSavedMovies } from '../../redux/services/movies/setSavedMovies'
import { setSavedShows } from '../../redux/services/shows/setSavedShows'

// context
import { useMovieContext } from '../../context/context'

// components
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu'
import MovieList from '../../components/MovieList/MovieList'
import TvList from '../../components/TvList/TvList'

const Home = () => {
  const { mode, movieState } = useMovieContext()
  const dispatch = useDispatch()

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    const savedToken = sessionStorage.getItem('token')

    if (savedToken !== '' || savedToken !== undefined || savedToken !== null) {
      movieState ? dispatch(setSavedMovies()) : dispatch(setSavedShows())
    }

    const genreId = sessionStorage.getItem('genreId')

    if (movieState && genreId) {
      dispatch(getMovies({ value: 'genre', id: genreId }))
    } else if (!movieState && genreId) {
    } else if (movieState) {
      dispatch(getMovies('popular'))
    } else {
      dispatch(getTvShows('popular'))
    }
  }, [dispatch, movieState])

  return (
    <div
      className={
        'home ' + (mode === true ? 'lightBg1 darColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
      <Menu />
      {movieState ? <MovieList /> : <TvList />}
    </div>
  )
}

export default Home
