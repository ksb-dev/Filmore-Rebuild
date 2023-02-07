import React from 'react'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { getMovies } from '../../redux/services/getMovies'

// Recat router dom
import { Link } from 'react-router-dom'

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
    setLogoutState,
    logoutRef,
    logoutInnerRef,
    setIndex,
    movieState,
    setMovieState
  } = useMovieContext()
  const { showMenu, showForm, showLogout, hideLogout, userRef } = useShowHide()
  const user = useSelector(state => state.watchlist.user)
  const dispatch = useDispatch()

  const toggleLogout = () => {
    setLogoutState(!logoutState)

    if (logoutState) {
      hideLogout(logoutRef)
    } else {
      showLogout(logoutRef)
    }
  }

  const handleMovieState = val => {
    val === 'movie' ? setMovieState(true) : setMovieState(false)
  }

  return (
    <div className='header '>
      <div className='header__options'>
        <div className='header__options__one'>
          <Link
            to='/'
            className='title '
            onClick={() => {
              sessionStorage.setItem('page', 1)
              sessionStorage.setItem('term', '')
              //setQuery('')
              setIndex(0)
              dispatch(getMovies('popular'))
            }}
          >
            {/* <span className='title__part--1'>Film</span>
            <span className='title__icon'>{iconsData.film}</span>
            <span className='title__part--2'>pedia</span> */}
            Filmzilla
          </Link>
        </div>

        <div className='header__options__middle'>
          <span
            className={'movie ' + (movieState ? 'activeMovie' : '')}
            onClick={() => handleMovieState('movie')}
          >
            {iconsData.movie} Movies
          </span>
          <span
            className={'tv ' + (!movieState ? 'activeMovie' : '')}
            onClick={() => handleMovieState('tv')}
          >
            {iconsData.tv} Tv
          </span>
        </div>

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
                ref={userRef}
                to='#'
                className='user-icon '
                onClick={() => toggleLogout()}
              >
                {iconsData.close}
              </span>
            ) : (
              <span
                ref={userRef}
                to='#'
                className='user-icon '
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
