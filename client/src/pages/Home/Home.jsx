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
  const { mode, movieState, activeOption } = useMovieContext()
  const dispatch = useDispatch()

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    // Check for token
    const savedToken = sessionStorage.getItem('token')

    if (savedToken !== '' || savedToken !== undefined || savedToken !== null) {
      sessionStorage.getItem('movieState') === 'movie'
        ? dispatch(setSavedMovies())
        : dispatch(setSavedShows())
    }

    // Check for movie state
    const savedMovieState = sessionStorage.getItem('movieState')
    if (!savedMovieState) {
      sessionStorage.setItem('movieState', 'movie')
      savedMovieState = 'movie'
    }

    // Check for option
    let activeOption = sessionStorage.getItem('option')
    if (!activeOption) {
      sessionStorage.setItem('option', 'popular')
      activeOption = 'popular'
    }

    const genreId = sessionStorage.getItem('genreId')

    if (activeOption === 'popular' || activeOption === 'top') {
      if (sessionStorage.getItem('movieState') === 'movie') {
        dispatch(getMovies(activeOption))
      } else {
        dispatch(getTvShows(activeOption))
      }
      return
    }

    if (savedMovieState === 'movie' && genreId) {
      dispatch(getMovies({ value: 'genre', id: genreId }))
    } else {
      dispatch(getTvShows({ value: 'genre', id: genreId }))
    }

    // if (
    //   sessionStorage.getItem('movieState') === 'movie' &&
    //   activeOption &&
    //   genreId
    // ) {
    //   dispatch(getMovies({ value: 'genre', id: genreId }))
    // } else if (
    //   sessionStorage.getItem('movieState') === 'tv' &&
    //   activeOption &&
    //   genreId
    // ) {
    //   dispatch(getTvShows({ value: 'genre', id: genreId }))
    // } else if (
    //   sessionStorage.getItem('movieState') === 'movie' &&
    //   activeOption
    // ) {
    //   dispatch(getMovies(activeOption))
    // } else if (sessionStorage.getItem('movieState') === 'tv' && activeOption) {
    //   dispatch(getTvShows(activeOption))
    // } else if (sessionStorage.getItem('movieState') === 'movie' && genreId) {
    //   dispatch(getMovies({ value: 'genre', id: genreId }))
    // } else if (sessionStorage.getItem('movieState') === 'tv' && genreId) {
    //   dispatch(getTvShows({ value: 'genre', id: genreId }))
    // } else if (
    //   sessionStorage.getItem('movieState') === 'movie' ||
    //   sessionStorage.getItem('movieState') === null
    // ) {
    //   dispatch(getMovies('popular'))
    // } else {
    //   dispatch(getTvShows('popular'))
    // }
  }, [dispatch, movieState, activeOption])

  return (
    <div
      className={
        'home ' + (mode === true ? 'lightBg1 darColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
      <Menu />
      {sessionStorage.getItem('movieState') === 'movie' ||
      sessionStorage.getItem('movieState') === null ? (
        <MovieList />
      ) : (
        <TvList />
      )}
    </div>
  )
}

export default Home
