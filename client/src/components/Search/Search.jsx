import React, { useState, useEffect, useRef } from 'react'

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
import { getMovies } from '../../redux/services/movies/getMovies'
import { getTvShows } from '../../redux/services/shows/getTvShows'

const Search = () => {
  const [open, setOpen] = useState(false)
  const btnRef = useRef(null)
  const optionRef = useRef(null)
  const closeRef = useRef(null)

  const {
    setMovieState,
    setIndex,
    movieState,
    mode,
    setMode,
    searchQuery,
    setSearchQuery
  } = useMovieContext()
  const { showSort, hideSort } = useShowHide()
  const [optionState, setOptionState] = useState(
    sessionStorage.getItem('movieState') || 'movie'
  )
  const dispatch = useDispatch()

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    //searchQuery = sessionStorage.getItem('searchQuery')
    // const movieState = sessionStorage.getItem('movieState')

    // if (searchQuery && movieState === 'movie') {
    //   dispatch(getMovies('search'))
    // }

    // if (searchQuery && movieState === 'tv') {
    //   dispatch(getTvShows('search'))
    // }

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

    //searchQuery = sessionStorage.getItem('searchQuery')
    const movieState = sessionStorage.getItem('movieState')

    if (searchQuery && movieState === 'movie') {
      dispatch(getMovies('search'))
    }

    if (searchQuery && movieState === 'tv') {
      dispatch(getTvShows('search'))
    }
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
            onChange={e => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <span>{iconsData.searchIcon}</span>
        </form>

        <span onClick={() => setMode(!mode)} className='mode-icon'>
          {mode === true ? iconsData.sunIcon : iconsData.moonIcon}
        </span>
      </div>
    </div>
  )
}

export default Search
