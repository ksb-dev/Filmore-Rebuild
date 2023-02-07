import React, { useState, useRef, createContext, useContext } from 'react'

// 1. Create Context
const MovieContext = createContext()

const MovieProvider = ({ children }) => {
  const [mode, setMode] = useState(true)

  // For wall images
  const [index, setIndex] = useState(0)

  // For switching between movie & tv
  const [movieState, setMovieState] = useState(true)

  // For logout component
  const [logoutState, setLogoutState] = useState(false)
  const logoutRef = useRef(null)
  const userIconRef = useRef(null)

  const [categoryState, setCategoryState] = useState(false)
  const categoryRef = useRef(null)

  return (
    <MovieContext.Provider
      value={{
        mode,
        setMode,

        logoutState,
        setLogoutState,
        logoutRef,
        userIconRef,

        index,
        setIndex,

        movieState,
        setMovieState,

        categoryState,
        setCategoryState,
        categoryRef
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
