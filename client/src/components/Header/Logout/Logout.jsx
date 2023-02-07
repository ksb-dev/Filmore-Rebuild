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
  const { hideLogout } = useShowHide()
  const { logout } = useAuthentication()
  const user = useSelector(state => state.watchlist.user)

  // Detect outside click of Filter Menu
  // useEffect(() => {
  //   const closeLogout = e => {
  //     console.log(userIconRef.current)

  //     if (
  //       userIconRef.current &&
  //       (userIconRef.current.contains(e.target) ||
  //         !userIconRef.current.contains(e.target))
  //     ) {
  //       //setOpen(false)
  //       console.log(true)
  //       setLogoutState(false)
  //     }
  //   }

  //   if (logoutState) {
  //     //showSort(btnRef, closeRef)
  //     logoutRef.current.style.opacity = '1'
  //     logoutRef.current.style.zIndex = '5'
  //   } else {
  //     //hideSort(btnRef, closeRef)
  //     logoutRef.current.style.opacity = '0'
  //     logoutRef.current.style.zIndex = '-1'
  //   }

  //   document.body.addEventListener('click', closeLogout)

  //   return () => {
  //     document.body.removeEventListener('click', closeLogout)
  //   }
  // }, [logoutState])

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
