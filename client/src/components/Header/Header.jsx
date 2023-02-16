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
import Search from '../Search/Search'

const Header = () => {
  const {
    mode,
    setMode,
    logoutState,
    setIndex,
    movieState,
    setMovieState,
    userIconRef,
    menuIconRef,
    optionState,
    setSearchQuery
  } = useMovieContext()

  const user1 = useSelector(state => state.savedMovies.user)
  const user2 = useSelector(state => state.savedShows.user)
  const savedMovies = useSelector(state => state.savedMovies.savedMovies)
  const savedShows = useSelector(state => state.savedShows.savedShows)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  // Title Click
  const handleTitleClick = () => {
    setMovieState(!movieState)
    sessionStorage.setItem('movieState', 'movie')
    sessionStorage.removeItem('genreId')
    sessionStorage.removeItem('option')
    sessionStorage.removeItem('searchQuery')
    setSearchQuery('')
    sessionStorage.setItem('page', 1)
    sessionStorage.setItem('term', '')
    setIndex(0)
    dispatch(getMovies('Popular'))
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
          </Link>

          {window.location.pathname === '/login' ||
          window.location.pathname === '/register' ? (
            <></>
          ) : (
            <span ref={menuIconRef} className='menu-icon'>
              {iconsData.menu} Menu
            </span>
          )}

          <span onClick={() => setMode(!mode)} className='mode-icon'>
            {mode === true ? iconsData.sunIcon : iconsData.moonIcon}
          </span>
        </div>

        {window.location.pathname === '/login' ||
        window.location.pathname === '/register' ? (
          <></>
        ) : (
          <div className='header__options__middle'>
            <Search />
          </div>
        )}

        {/* Two */}
        <div className='header__options__two'>
          {window.location.pathname === '/' ? (
            <span
              onClick={() => navigate('/')}
              className='home-icon activeMovie'
            >
              {iconsData.home}
            </span>
          ) : (
            <span onClick={() => navigate('/')} className='home-icon'>
              {iconsData.home}
            </span>
          )}

          {window.location.pathname === '/watchlist' ? (
            <Link to='/watchlist' className='watchlist activeMovie'>
              {iconsData.watchlist}
              <p>
                <span>
                  {optionState === 'movie'
                    ? savedMovies && savedMovies.length
                    : savedShows && savedShows.length}
                </span>
              </p>
            </Link>
          ) : (
            <Link to='/watchlist' className='watchlist'>
              {iconsData.watchlist}
              <p>
                <span>
                  {optionState === 'movie'
                    ? savedMovies && savedMovies.length
                    : savedShows && savedShows.length}
                </span>
              </p>
            </Link>
          )}

          <div ref={userIconRef} className='user'>
            {user1 && user2 ? (
              logoutState ? (
                <div to='#' className='close-icon'>
                  {iconsData.close}
                </div>
              ) : (
                <div to='#' className='user-icon'>
                  {iconsData.user}
                </div>
              )
            ) : window.location.pathname === '/login' ||
              window.location.pathname === '/register' ? (
              <Link to='/login' className='login-icon activeMovie'>
                {iconsData.login}
              </Link>
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
