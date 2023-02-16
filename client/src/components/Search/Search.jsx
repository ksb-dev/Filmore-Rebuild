import React, { useState, useEffect, useRef } from 'react'

// react-router-dom
import { useNavigate } from 'react-router-dom'

// APIs
import { APIs } from '../../APIs/APIs'

// hooks
import { useShowHide } from '../../hooks/useShowHide'

// context
import { useMovieContext } from '../../context/context'

// data
import { iconsData } from '../../data/icons'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { getMovieResults } from '../../redux/services/movies/getMovieResults'
import { getTvResults } from '../../redux/services/shows/getTvResults'

// components
import SearchResults from '../SearchResults/SearchResults'

const Search = () => {
  const [open, setOpen] = useState(false)
  const btnRef = useRef(null)
  const optionRef = useRef(null)
  const closeRef = useRef(null)
  const movieResults = useSelector(state => state.movieResults.movieResults)
  const tvResults = useSelector(state => state.tvResults.tvResults)

  const {
    setMovieState,
    setIndex,
    movieState,
    mode,
    setMode,
    searchQuery,
    setSearchQuery,
    searchResultsRef
  } = useMovieContext()
  const { showSort, hideSort } = useShowHide()
  const [optionState, setOptionState] = useState(
    sessionStorage.getItem('movieState') || 'movie'
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // useEffect(() => {
  //   sessionStorage.setItem('searchQuery', searchQuery)
  //   if (searchQuery.length === 0) {
  //     setMovieState(!movieState)
  //   }
  // }, [searchQuery])

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    const toggleSort = e => {
      if (!optionRef.current.contains(e.target)) {
        setOpen(false)
      } else {
        setOpen(!open)
      }
    }

    if (open) {
      showSort(btnRef, closeRef)
    } else {
      hideSort(btnRef, closeRef)
    }

    document.body.addEventListener('click', toggleSort)

    return () => {
      document.body.removeEventListener('click', toggleSort)
    }
  }, [open])

  const handleOptionState = () => {
    if (optionState === 'movie') {
      setOptionState('tv')
    } else {
      setOptionState('movie')
    }
    sessionStorage.setItem(
      'movieState',
      optionState === 'movie' ? 'tv' : 'movie'
    )
    setIndex(0)
    sessionStorage.setItem('page', 1)
    sessionStorage.setItem('term', '')
    sessionStorage.removeItem('genreId')
    if (window.location.pathname !== '/watchlist') {
      sessionStorage.removeItem('option')
    }
    setMovieState(!movieState)
  }

  const handleSubmit = e => {
    e.preventDefault()
    sessionStorage.setItem('searchQuery', searchQuery)
    setIndex(0)
    sessionStorage.setItem('page', 1)

    navigate('/search')
  }

  return (
    <div className='search__component'>
      <div className='search__component__options' ref={optionRef}>
        <div className='current'>
          <span>{optionState}</span>
          <span>
            <i className='fa-solid fa-chevron-down' ref={btnRef}></i>
          </span>
        </div>
        <div
          className='remaining'
          ref={closeRef}
          onClick={() => handleOptionState()}
        >
          <span>{optionState === 'movie' ? 'tv' : 'movie'}</span>
        </div>
      </div>
      <div className='search__component__search-bar'>
        <form onSubmit={e => handleSubmit(e)}>
          <input
            type='text'
            placeholder={optionState === 'movie' ? 'Search Movie' : 'Search Tv'}
            onChange={e => {
              setSearchQuery(e.target.value)
              //sessionStorage.setItem('searchQuery', searchQuery)
              if (sessionStorage.getItem('movieState') === 'movie') {
                dispatch(getMovieResults(searchQuery))
              }

              if (sessionStorage.getItem('movieState') === 'tv') {
                dispatch(getTvResults(searchQuery))
              }
            }}
            value={searchQuery}
          />
          <span>{iconsData.searchIcon}</span>
        </form>

        <span onClick={() => setMode(!mode)} className='mode-icon'>
          {mode === true ? iconsData.sunIcon : iconsData.moonIcon}
        </span>
      </div>

      {sessionStorage.getItem('movieState') === 'movie' &&
        searchQuery &&
        movieResults &&
        movieResults.length > 0 && <SearchResults />}

      {sessionStorage.getItem('movieState') === 'tv' &&
        searchQuery &&
        tvResults &&
        tvResults.length > 0 && <SearchResults />}
    </div>
  )
}

export default Search
