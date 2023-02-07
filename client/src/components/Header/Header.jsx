import React, { useState, useRef, useEffect } from 'react'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { getMovies } from '../../redux/services/getMovies'

// Recat router dom
import { Link, useNavigate } from 'react-router-dom'

// context
import { useMovieContext } from '../../context/context'

// hooks
import { useShowHide } from '../../hooks/useShowHide'

// data
import { iconsData } from '../../data/icons'

// components
import Logout from './Logout/Logout'
import Categories from './Categories/Categories'

const Header = () => {
  const {
    mode,
    setMode,
    logoutState,
    setLogoutState,
    logoutRef,
    logoutInnerRef,
    setIndex,
    movieState,
    setMovieState,
    categoryState,
    setCategoryState,
    categoryRef,
    userIconRef
  } = useMovieContext()
  const { showMenu, showForm, showLogout, hideLogout } = useShowHide()
  const movies = useSelector(state => state.movies.movies)
  const user = useSelector(state => state.watchlist.user)
  const dispatch = useDispatch()
  const moviesRef = useRef(null)
  const navigate = useNavigate()

  //Detect outside click of Filter Menu
  useEffect(() => {
    const closeFilter = e => {
      if (
        moviesRef.current &&
        !moviesRef.current.contains(e.target) &&
        !categoryRef.current.contains(e.target)
      ) {
        categoryRef.current.style.display = 'none'
        setCategoryState(false)
      }
    }

    document.body.addEventListener('click', closeFilter)

    return () => {
      document.body.removeEventListener('click', closeFilter)
    }
  }, [])

  // Toggle Logout
  const toggleLogout = () => {
    setLogoutState(!logoutState)

    if (logoutState) {
      hideLogout(logoutRef)
    } else {
      showLogout(logoutRef)
    }
  }

  // Title Click
  const handleTitleClick = () => {
    setMovieState(true)
    sessionStorage.setItem('page', 1)
    sessionStorage.setItem('term', '')
    //setQuery('')
    setIndex(0)
    dispatch(reset({ movies, sortValue: 'All' }))
    //navigate('/')
  }

  const handleMovieState = val => {
    setIndex(0)
    val === 'movie' ? setMovieState(true) : setMovieState(false)

    setCategoryState(!categoryState)

    if (categoryState) {
      categoryRef.current.style.display = 'none'
    } else {
      categoryRef.current.style.display = 'block'
    }
  }

  return (
    <div className='header '>
      <div className='header__options'>
        <div className='header__options__one'>
          <Link
            to='/'
            className='title '
            onClick={() => {
              handleTitleClick()
            }}
          >
            <span className='title__part--1'>Film</span>
            <span className='title__icon'>{iconsData.film}</span>
            <span className='title__part--2'>ra</span>
          </Link>
        </div>

        {window.location.pathname === '/login' ||
        window.location.pathname === '/register' ? (
          <></>
        ) : (
          <div className='header__options__middle'>
            <div
              ref={moviesRef}
              className={'movie ' + (movieState ? 'activeMovie' : '')}
              onClick={() => handleMovieState('movie')}
            >
              {iconsData.movie} Movies
              <Categories />
            </div>

            <div
              className={'tv ' + (!movieState ? 'activeMovie' : '')}
              onClick={() => handleMovieState('tv')}
            >
              {iconsData.tv} Tv
            </div>
          </div>
        )}

        <div className='header__options__two'>
          <span onClick={() => setMode(!mode)} className='mode-icon '>
            {mode === true ? iconsData.sunIcon : iconsData.moonIcon}
          </span>

          <Link to='/search' className='search-icon '>
            {iconsData.searchIcon}
          </Link>

          {user ? (
            logoutState ? (
              <span
                ref={userIconRef}
                to='#'
                className='user-icon '
                onClick={() => toggleLogout()}
              >
                {iconsData.close}
              </span>
            ) : (
              <span
                //ref={userIconRef}
                to='#'
                className='close-icon '
                onClick={() => toggleLogout()}
              >
                {iconsData.user}
              </span>
            )
          ) : (
            <Link to='/login' className='user-icon '>
              {iconsData.login}
            </Link>
          )}
        </div>
      </div>

      {/* Logout Component */}
      <Logout />
    </div>
  )
}

export default Header
