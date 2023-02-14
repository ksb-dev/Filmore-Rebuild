import React, { useState, useEffect, useRef } from 'react'

// hooks
import { useShowHide } from '../../hooks/useShowHide'

// context
import { useMovieContext } from '../../context/context'

// data
import { iconsData } from '../../data/icons'

const Search = () => {
  const [open, setOpen] = useState(false)
  const btnRef = useRef(null)
  const optionRef = useRef(null)
  const closeRef = useRef(null)

  const { setMovieState, setIndex, movieState } = useMovieContext()
  const { showSort, hideSort } = useShowHide()
  const [optionState, setOptionState] = useState(
    sessionStorage.getItem('movieState') || 'movie'
  )

  useEffect(() => {
    const toggleSort = e => {
      if (!optionRef.current.contains(e.target)) {
        setOpen(false)
      } else {
        setOpen(!open)
      }
    }

    if (open) {
      showSort(btnRef, closeRef)

      //   if (
      //     window.location.pathname === '/login' ||
      //     window.location.pathname === '/register'
      //   ) {
      //     return
      //   } else {
      //     showSort(btnRef, closeRef)
      //   }
    } else {
      hideSort(btnRef, closeRef)

      //   if (
      //     window.location.pathname === '/login' ||
      //     window.location.pathname === '/register'
      //   ) {
      //     return
      //   } else {
      //     hideSort(btnRef, closeRef)
      //   }
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
        <form>
          <input
            type='text'
            placeholder={optionState === 'movie' ? 'Search Movie' : 'Search Tv'}
          />
          <span>{iconsData.searchIcon}</span>
        </form>
      </div>
    </div>
  )
}

export default Search
