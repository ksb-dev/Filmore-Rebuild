import React, { useEffect } from 'react'

// Redux
import { useSelector } from 'react-redux'

// Hooks
import { useShowHide } from '../../../hooks/useShowHide'
import { useAuthentication } from '../../../hooks/useAuthentication'

// Context
import { useMovieContext } from '../../../context/context'

const Logout = () => {
  const { mode, logoutState, setLogoutState, logoutRef, userIconRef } =
    useMovieContext()
  const { showLogout, hideLogout } = useShowHide()
  const { logout } = useAuthentication()
  const user = useSelector(state => state.savedMovies.user)

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
        (mode === true ? 'lightBg1 darkColor2' : 'darkBg2 lightColor1')
      }
    >
      <span> {user && user.charAt(0).toUpperCase() + user.substring(1)}</span>
      <span onClick={() => handleLogout()}>Logout</span>
    </div>
  )
}

export default Logout
