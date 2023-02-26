import React, { useState, useEffect, useRef } from 'react'

// context
import { useMovieContext } from '../../context/context'

// hooks
import { useShowHide } from '../../hooks/useShowHide'

const Options = () => {
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
    setSearchQuery,
    searchResultsRef,
    optionState,
    setOptionState,
    searchOptionState,
    setSearchOptionState
  } = useMovieContext()
  const { showSort, hideSort } = useShowHide()

  useEffect(() => {
    // window.scroll({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth'
    // })

    const toggleSort = e => {
      setOpen(false)
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
    setSearchQuery('')
    if (searchOptionState === 'movie') {
      setSearchOptionState('tv')
      //setOptionState('tv')
      //sessionStorage.setItem('movieState', 'tv')
    } else {
      setSearchOptionState('movie')
      //setOptionState('movie')
      //sessionStorage.setItem('movieState', 'movie')
    }
    //setIndex(0)
    //sessionStorage.setItem('page', 1)
    //sessionStorage.setItem('term', '')
    //sessionStorage.removeItem('genreId')
    // if (window.location.pathname !== '/watchlist') {
    //   sessionStorage.removeItem('option')
    // }
    //setMovieState(!movieState)
  }

  return (
    <div>
      <div className='option__main' ref={optionRef}>
        <div className='option__main__current'>
          <span>{searchOptionState}</span>
          <span className='option__main__current__icon'>
            <i className='fa-solid fa-chevron-down' ref={btnRef}></i>
          </span>
        </div>
        <div
          className='option__main__option'
          ref={closeRef}
          onClick={() => handleOptionState()}
        >
          <span>{searchOptionState === 'movie' ? 'tv' : 'movie'}</span>
        </div>
      </div>
    </div>
  )
}

export default Options
