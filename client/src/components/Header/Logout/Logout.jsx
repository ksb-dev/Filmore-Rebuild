import React, { useEffect } from 'react'

// react router dom

// data
import { iconsData } from '../../../data/icons'

// Redux
import { useSelector } from 'react-redux'

// react router dom
import { Link } from 'react-router-dom'

// Hooks
import { useShowHide } from '../../../hooks/useShowHide'
import { useAuthentication } from '../../../hooks/useAuthentication'

// Context
import { useMovieContext } from '../../../context/context'

const Logout = () => {
  const {
    mode,
    logoutState,
    setLogoutState,
    logoutRef,
    userIconRef,
    movieState,
    setMovieState
  } = useMovieContext()
  const { showLogout, hideLogout } = useShowHide()
  const { logout } = useAuthentication()
  const user = useSelector(state => state.savedMovies.user)
  const savedMovies = useSelector(state => state.savedMovies.savedMovies)
  const savedShows = useSelector(state => state.savedShows.savedShows)

  // Toggle logout & Detect outside click of logout component
  useEffect(() => {
    const toggleLogout = e => {
      if (logoutRef.current.contains(e.target)) {
        return
      }
      if (!userIconRef.current.contains(e.target)) {
        setLogoutState(false)
      } else {
        setLogoutState(!logoutState)
      }
    }

    if (user && logoutState) {
      showLogout(logoutRef)
    } else {
      hideLogout(logoutRef)
    }

    document.body.addEventListener('click', toggleLogout)

    return () => {
      document.body.removeEventListener('click', toggleLogout)
    }
  }, [logoutState, user])

  const handleLogout = () => {
    hideLogout(logoutRef)
    logout()
  }

  return (
    <div
      ref={logoutRef}
      className={
        'logout ' +
        (mode === true ? 'lightBg2 darkColor2' : 'darkBg1 lightColor1')
      }
    >
      <div className='logout__inner'>
        <span
          className={
            'logout__inner--user ' + (mode === true ? 'lightBg1' : 'darkBg2')
          }
        >
          {iconsData.user1}
          {user && user.charAt(0).toUpperCase() + user.substring(1)}
        </span>

        <span
          className='logout__inner--logoutBtn'
          onClick={() => handleLogout()}
        >
          {iconsData.logout} Logout
        </span>
      </div>
    </div>
  )
}

export default Logout
