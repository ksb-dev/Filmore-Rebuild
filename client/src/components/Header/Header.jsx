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

const Header = () => {
  const {
    mode,
    setMode,
    logoutState,
    setIndex,
    movieState,
    setMovieState,
    categoryState,
    setCategoryState,
    categoryRef,
    userIconRef
  } = useMovieContext()
  //const { showMenu, showForm, showLogout, hideLogout } = useShowHide()
  const movies = useSelector(state => state.movies.movies)
  const user = useSelector(state => state.watchlist.user)
  const dispatch = useDispatch()
  const moviesRef = useRef(null)
  const navigate = useNavigate()

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
  }

  return (
    <div
      className={
        'header '
        // +
        // (mode === true ? 'lightBg2 darkColor2' : 'darkBg1 lightColor1')
      }
    >
      <div className='header__options'>
        <div className='header__options__one'>
          <Link
            to='/'
            className={
              'title '
              //+ (mode === true ? 'darkColor2' : 'lightColor1')
            }
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
          <span
            onClick={() => setMode(!mode)}
            className={
              'mode-icon '
              // +
              // (mode === true ? 'lightBg2 darkColor2' : 'darkBg1 lightColor1')
            }
          >
            {mode === true ? iconsData.sunIcon : iconsData.moonIcon}
          </span>

          <Link
            to='/search'
            className={
              'search-icon '
              // +
              // (mode === true ? 'lightBg2 darkColor2' : 'darkBg1 lightColor1')
            }
          >
            {iconsData.searchIcon}
          </Link>

          <div ref={userIconRef} className='user'>
            {user ? (
              logoutState ? (
                <div
                  to='#'
                  className={
                    'close-icon '
                    // +
                    // (mode === true
                    //   ? 'lightBg2 darkColor2'
                    //   : 'darkBg1 lightColor1')
                  }
                >
                  {iconsData.close}
                </div>
              ) : (
                <div
                  to='#'
                  className={
                    'user-icon '
                    // +
                    // (mode === true
                    //   ? 'lightBg2 darkColor2'
                    //   : 'darkBg1 lightColor1')
                  }
                >
                  {iconsData.user}
                </div>
              )
            ) : (
              <Link
                to='/login'
                className={
                  'login-icon '

                  // +(mode === true
                  //   ? 'lightBg2 darkColor2'
                  //   : 'darkBg1 lightColor1')
                }
              >
                {iconsData.login}
              </Link>
            )}
            <Logout />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
