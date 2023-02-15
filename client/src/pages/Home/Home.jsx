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
import SmallHeader from '../../components/Header/SmallHeader/SmallHeader'
import Menu from '../../components/Menu/Menu'
import MovieList from '../../components/MovieList/MovieList'
import TvList from '../../components/TvList/TvList'

const Home = () => {
  const { mode, movieState, activeOption, setSearchQuery } = useMovieContext()
  const dispatch = useDispatch()

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    // Check for movie state
    let savedMovieState = sessionStorage.getItem('movieState')
    if (!savedMovieState) {
      sessionStorage.setItem('movieState', 'movie')
      savedMovieState = 'movie'
    }

    const searchQuery = sessionStorage.getItem('searchQuery')

    if (searchQuery && savedMovieState === 'movie') {
      dispatch(getMovies('search'))
      console.log(1)
    }

    if (searchQuery && savedMovieState === 'tv') {
      dispatch(getTvShows('search'))
      console.log(2)
    }

    // Check for token
    const savedToken = sessionStorage.getItem('token')

    if (savedToken !== '' || savedToken !== undefined || savedToken !== null) {
      dispatch(setSavedMovies())
      dispatch(setSavedShows())
      console.log(3)
    }

    // Check for option
    let activeOption = sessionStorage.getItem('option')
    if (!activeOption) {
      sessionStorage.setItem('option', 'Popular')
      activeOption = 'Popular'
    }

    const genreId = sessionStorage.getItem('genreId')

    if (
      activeOption === 'Popular' ||
      activeOption === 'Top Rated' ||
      activeOption === 'In Theatres' ||
      activeOption === 'On Air'
    ) {
      if (!searchQuery && sessionStorage.getItem('movieState') === 'movie') {
        dispatch(getMovies(activeOption))
        console.log(4)
      }
      if (!searchQuery && sessionStorage.getItem('movieState') === 'tv') {
        dispatch(getTvShows(activeOption))
        console.log(5)
      }
      //return
    }

    if (!searchQuery && savedMovieState === 'movie' && genreId !== null) {
      dispatch(getMovies({ value: 'genre', id: genreId }))
      console.log(6)
    }
    if (!searchQuery && savedMovieState === 'tv' && genreId !== null) {
      dispatch(getTvShows({ value: 'genre', id: genreId }))
      console.log(7)
    }
    console.log('-------------------------')
  }, [dispatch, movieState, activeOption])

  return (
    <div
      className={
        'home ' + (mode === true ? 'lightBg1 darColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
      <SmallHeader />
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
