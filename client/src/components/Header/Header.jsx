import React, { useRef } from 'react'

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
  const user = useSelector(state => state.savedMovies.user)
  const dispatch = useDispatch()
  const moviesRef = useRef(null)

  // Title Click
  const handleTitleClick = () => {
    setMovieState(!movieState)
    sessionStorage.setItem('movieState', 'movie')
    sessionStorage.removeItem('genreId')
    sessionStorage.removeItem('option')
    sessionStorage.setItem('page', 1)
    sessionStorage.setItem('term', '')
    setIndex(0)
    dispatch(getMovies('popular'))
  }

  const handleMovieState = val => {
    sessionStorage.setItem('movieState', val === 'movie' ? 'movie' : 'tv')
    setIndex(0)
    sessionStorage.setItem('page', 1)
    sessionStorage.setItem('term', '')
    sessionStorage.removeItem('genreId')
    sessionStorage.removeItem('option')
    setMovieState(!movieState)
  }

  return (
    <div className='header'>
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
        )}

        <div className='header__options__two'>
          {window.location.pathname === '/login' ||
          window.location.pathname === '/register' ? (
            <></>
          ) : (
            <span ref={menuIconRef} className='menu-icon'>
              {iconsData.menu}
            </span>
          )}

          <span onClick={() => setMode(!mode)} className='mode-icon'>
            {mode === true ? iconsData.sunIcon : iconsData.moonIcon}
          </span>

          {window.location.pathname === '/login' ||
          window.location.pathname === '/register' ? (
            <></>
          ) : (
            <Link to='/search' className='search-icon '>
              {iconsData.searchIcon}
            </Link>
          )}

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
            <Logout />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
