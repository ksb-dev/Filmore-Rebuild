import React, { useEffect } from 'react'

// Redux
import { useSelector } from 'react-redux'

// Hooks
import { useShowHide } from '../../../hooks/useShowHide'
import { useAuthentication } from '../../../hooks/useAuthentication'

// Context
import { useMovieContext } from '../../../context/context'

const Logout = () => {
  const { mode, logoutState, setLogoutState, logoutRef, userRef } =
    useMovieContext()
  const { hideLogout } = useShowHide()
  const { logout } = useAuthentication()
  const user = useSelector(state => state.watchlist.user)

  const handleLogout = () => {
    setLogoutState(!logoutState)
    hideLogout(logoutRef)
    logout()
  }

  return (
    <div
      ref={logoutRef}
      className={
        'logout ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg1 lightColor1')
      }
    >
      <span> {user && user.charAt(0).toUpperCase() + user.substring(1)}</span>
      <span onClick={() => handleLogout()}>Logout</span>
    </div>
  )
}

export default Logout
