import { useState, useEffect } from 'react'
import axios from 'axios'

// React router dom
import { useNavigate } from 'react-router-dom'

// Context
import { useMovieContext } from '../Context/Context'

// APIs
import { APIs } from '../APIs/APIs'

// Hooks
import { useShowHide } from './useShowHide'

// Reudx
import { useDispatch } from 'react-redux'
import { getMovies } from '../Redux/Services/getMovies'
import { setWatchlist } from '../Redux/Services/setWatchlist'

export const useAuthentication = () => {
  const { hideForm, hideLogout } = useShowHide()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  //const { logoutRef } = useMovieContext()

  // ----------------------- Register user ---------------------------
  const register = async (
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword
  ) => {
    setError(null)
    setIsPending(true)

    try {
      const response = await axios.post(APIs.register_url, {
        name,
        email,
        password
      })

      if (!response) {
        setError('Could not complete, Try again!')
        setTimeout(() => {
          setError('')
        }, 2000)
      } else {
        sessionStorage.setItem('name', response.data.user.name)
        sessionStorage.setItem('token', response.data.token)

        dispatch(setWatchlist())

        if (window.location.pathname === '/watchlist') {
          dispatch(getMovies('watchlist'))
        }

        setName('')
        setEmail('')
        setPassword('')
        setError('')

        navigate('/')
      }

      // Update state
      if (!isCancelled) {
        setError(null)
        setIsPending(false)
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.response.data.message)

        setTimeout(() => {
          setError('')
        }, 2000)

        setIsPending(false)
      }
    }
  }

  // ----------------------- Login user ---------------------------
  const login = async (email, password, setEmail, setPassword) => {
    setError(null)
    setIsPending(true)

    try {
      const response = await axios.post(APIs.login_url, {
        email,
        password
      })

      if (!response) {
        setError('Could not complete, Try again!')
        setIsPending(false)
        setTimeout(() => {
          setError('')
        }, 2000)
      } else {
        sessionStorage.setItem('name', response.data.user.name)
        sessionStorage.setItem('token', response.data.token)

        dispatch(setWatchlist())

        if (window.location.pathname === '/watchlist') {
          dispatch(getMovies('watchlist'))
        }

        setEmail('')
        setPassword('')
        setError('')
        setIsPending(false)

        navigate('/')
      }

      // Update state
      if (!isCancelled) {
        setError(null)
        setIsPending(false)
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.response.data.message)

        setTimeout(() => {
          setError('')
        }, 2000)

        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => {
      setIsCancelled(false)
    }
  }, [])

  // ----------------------- Logout user ---------------------------
  const logout = () => {
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('token')
    //sessionStorage.removeItem('term')

    //hideLogout(logoutRef)

    dispatch(setWatchlist())

    if (window.location.pathname === '/watchlist') {
      dispatch(getMovies('watchlist'))
    }
  }

  return { register, login, logout, error, isPending }
}
