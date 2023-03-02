import React, { useEffect } from 'react'

// redux
import { useDispatch } from 'react-redux'
import { getMovies } from '../../redux/services/movies/getMovies'
import { getTvShows } from '../../redux/services/shows/getTvShows'
import {
  setSavedMovies,
  setMovieUserNull
} from '../../redux/services/movies/setSavedMovies'
import {
  setSavedShows,
  setTvUserNull
} from '../../redux/services/shows/setSavedShows'
import { resetMovieSortState } from '../../redux/services/movies/getMovies'
import { resetTvSortState } from '../../redux/services/shows/getTvShows'

// context
import { useMovieContext } from '../../context/context'

// components
import Header from '../../components/Header/Header'
import SmallHeader from '../../components/Header/SmallHeader/SmallHeader'
import Menu from '../../components/Menu/Menu'
import MovieList from '../../components/MovieList/MovieList'
import TvList from '../../components/TvList/TvList'
import SearchModal from '../../components/SearchModal/SearchModal'

const Home = () => {
  const { mode, movieState, activeOption, setSearchQuery, setOptionState } =
    useMovieContext()
  const dispatch = useDispatch()

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    // 1. Set search query to ''
    sessionStorage.removeItem('searchQuery')
    setSearchQuery('')

    // 2. Check for movie state
    let savedMovieState = sessionStorage.getItem('movieState')

    if (!savedMovieState) {
      sessionStorage.setItem('movieState', 'movie')
      savedMovieState = 'movie'
    }

    if (savedMovieState === 'movie') {
      dispatch(resetMovieSortState('All'))
    }

    if (savedMovieState === 'tv') {
      dispatch(resetTvSortState('All'))
    }

    // 3. Check for token
    const savedToken = sessionStorage.getItem('token')

    if (savedToken !== '' || savedToken !== undefined || savedToken !== null) {
      dispatch(setSavedMovies())
      dispatch(setSavedShows())
    } else {
      dispatch(setMovieUserNull())
      dispatch(setTvUserNull())
    }

    // 4. Check for active category
    let activeOption = sessionStorage.getItem('option')

    if (!activeOption) {
      sessionStorage.setItem('option', 'Popular')
      activeOption = 'Popular'
    }

    if (
      activeOption === 'Popular' ||
      activeOption === 'Top Rated' ||
      activeOption === 'In Theatres' ||
      activeOption === 'On Air'
    ) {
      if (savedMovieState === 'movie') {
        dispatch(getMovies(activeOption))
      }
      if (savedMovieState === 'tv') {
        dispatch(getTvShows(activeOption))
      }
    }

    // 5. Check for active genre
    const genreId = sessionStorage.getItem('genreId')

    if (savedMovieState === 'movie' && genreId !== null) {
      dispatch(getMovies({ value: 'genre', id: genreId }))
    }
    if (savedMovieState === 'tv' && genreId !== null) {
      dispatch(getTvShows({ value: 'genre', id: genreId }))
    }
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
      <SearchModal />

      {sessionStorage.getItem('movieState') === 'movie' ||
      sessionStorage.getItem('movieState') === null ? (
        <MovieList state={'movie'} />
      ) : (
        <TvList state={'tv'} />
      )}
    </div>
  )
}

export default Home
