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

const Search = () => {
  const { mode, movieState } = useMovieContext()
  const dispatch = useDispatch()

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    const searchQuery = sessionStorage.getItem('searchQuery')
    let savedMovieState = sessionStorage.getItem('movieState')

    if (searchQuery && savedMovieState === 'movie') {
      dispatch(getMovies('search'))
      console.log(1)
    }

    if (searchQuery && savedMovieState === 'tv') {
      dispatch(getTvShows('search'))
      console.log(2)
    }

    const savedToken = sessionStorage.getItem('token')

    if (savedToken !== '' || savedToken !== undefined || savedToken !== null) {
      savedMovieState === 'movie'
        ? dispatch(setSavedMovies())
        : dispatch(setSavedShows())
    }
  }, [dispatch, movieState])

  return (
    <div
      className={
        'search ' +
        (mode === true ? 'lightBg1 darColor1' : 'darkBg2 lightColor1')
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

export default Search
