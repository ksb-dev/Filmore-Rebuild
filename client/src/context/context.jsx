import React, {
  useState,
  useRef,
  createContext,
  useContext,
  useEffect
} from 'react'

// 1. Create Context
const MovieContext = createContext()

const MovieProvider = ({ children }) => {
  const [mode, setMode] = useState(true)

  // For wall images
  const [index, setIndex] = useState(0)

  // For switching between movie & tv
  const [movieState, setMovieState] = useState(
    sessionStorage.getItem('appState') || true
  )

  // Logout component properties
  const [logoutState, setLogoutState] = useState(false)
  const logoutRef = useRef(null)
  const userIconRef = useRef(null)

  // Category component properties
  const [categoryState, setCategoryState] = useState(false)
  const categoryRef = useRef(null)

  // Menu component properties
  const [menuState, setMenuState] = useState(false)
  const menuIconRef = useRef(null)
  const menuRef = useRef(null)
  const menuInnerRef = useRef(null)

  // action, popular, war ...
  const [activeOption, setActiveOption] = useState(false)

  // movie / tv
  const [optionState, setOptionState] = useState(
    sessionStorage.getItem('movieState') || 'movie'
  )

  // search query
  const [searchQuery, setSearchQuery] = useState(
    sessionStorage.getItem('searchQuery') || ''
  )

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
        categoryRef,

        menuState,
        setMenuState,
        menuIconRef,
        menuRef,
        menuInnerRef,

        activeOption,
        setActiveOption,

        optionState,
        setOptionState,

        searchQuery,
        setSearchQuery
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
