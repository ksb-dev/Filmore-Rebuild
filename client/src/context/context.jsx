import React, { useState, useRef, createContext, useContext } from 'react'

// 1. Create Context
const MovieContext = createContext()

const MovieProvider = ({ children }) => {
  const [mode, setMode] = useState(true)

  const [logoutState, setLogoutState] = useState(false)
  const logoutRef = useRef(null)
  const userRef = useRef(null)

  const [index, setIndex] = useState(0)

  return (
    <MovieContext.Provider
      value={{
        mode,
        setMode,

        logoutState,
        setLogoutState,
        logoutRef,
        userRef,

        index,
        setIndex
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export const useMovieContext = () => {
  return useContext(MovieContext)
}

export { MovieContext, MovieProvider }
