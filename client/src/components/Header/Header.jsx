import React, { useState, useEffect, useRef } from 'react'

// hooks
import { useShowHide } from '../../hooks/useShowHide'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { getMovies } from '../../redux/services/movies/getMovies'

// Recat router dom
import { Link, useNavigate } from 'react-router-dom'

// context
import { useMovieContext } from '../../context/context'

// data
import { iconsData } from '../../data/icons'

// components
import Logout from './Logout/Logout'

const Header = () => {
  const {
    mode,
    setMode,
    logoutState,
    setIndex,
    movieState,
    setMovieState,
    userIconRef,
    menuIconRef
  } = useMovieContext()
  const [optionState, setOptionState] = useState(
    sessionStorage.getItem('movieState') || 'movie'
  )
  const [open, setOpen] = useState(false)
  const { showSort, hideSort } = useShowHide()

  const user = useSelector(state => state.savedMovies.user)
  const dispatch = useDispatch()
  const btnRef = useRef(null)
  const optionRef = useRef(null)
  const closeRef = useRef(null)
  const moviesRef = useRef(null)

  const navigate = useNavigate()

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
    } else {
      hideSort(btnRef, closeRef)
    }

    document.body.addEventListener('click', toggleSort)

    return () => {
      document.body.removeEventListener('click', toggleSort)
    }
  }, [open])

  // Title Click
  const handleTitleClick = () => {
    setMovieState(!movieState)
    sessionStorage.setItem('movieState', 'movie')
    sessionStorage.removeItem('genreId')
    sessionStorage.removeItem('option')
    sessionStorage.setItem('page', 1)
    sessionStorage.setItem('term', '')
    setIndex(0)
    dispatch(getMovies('Popular'))
  }

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
    <div className='header'>
      <div className='header__options'>
        {/* One */}
        <div className='header__options__one'>
          <Link
            to='/'
            className='title '
            onClick={() => {
              handleTitleClick()
            }}
          >
            TMDb
            {/* <span className='title__part--1'>Film</span>
            <span className='title__icon'>{iconsData.film}</span>
            <span className='title__part--2'>ra</span> */}
          </Link>
          <span ref={menuIconRef} className='menu-icon'>
            {iconsData.menu} Menu
          </span>
        </div>

        <div className='header__options__middle'>
          <div className='header__options__middle__options' ref={optionRef}>
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
          <div className='header__options__middle__search-bar'>
            <form>
              <input
                type='text'
                placeholder={
                  optionState === 'movie' ? 'Search Movie' : 'Search Tv'
                }
              />
              <span>{iconsData.searchIcon}</span>
            </form>
          </div>
        </div>

        {/* Middle */}
        {/* {window.location.pathname === '/login' ||
        window.location.pathname === '/register' ||
        window.location.pathname === '/search' ? (
          <></>
        ) : (
          <div className='header__options__middle'>
            <div
              ref={moviesRef}
              className={
                'movie ' +
                (sessionStorage.getItem('movieState') === 'movie' ||
                sessionStorage.getItem('movieState') === null
                  ? 'activeMovie'
                  : '')
              }
              onClick={() => handleMovieState('movie')}
            >
              {iconsData.movie} <span>Movies</span>
            </div>

            <span className='line'></span>

            <div
              className={
                'tv ' +
                (sessionStorage.getItem('movieState') === 'tv' && 'activeMovie')
              }
              onClick={() => handleMovieState('tv')}
            >
              {iconsData.tv} <span>Tv</span>
            </div>
          </div>
        )} */}

        {/* Two */}
        <div className='header__options__two'>
          <span onClick={() => setMode(!mode)} className='mode-icon'>
            {mode === true ? iconsData.sunIcon : iconsData.moonIcon}
          </span>

          <div ref={userIconRef} className='user'>
            {user ? (
              logoutState ? (
                <div to='#' className='close-icon'>
                  {iconsData.close}
                </div>
              ) : (
                <div to='#' className='user-icon'>
                  {iconsData.user}
                </div>
              )
            ) : (
              <Link to='/login' className='login-icon'>
                {iconsData.login}
              </Link>
            )}
            {/* Logout Component */}
            <Logout />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
