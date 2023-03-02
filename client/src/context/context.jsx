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
  const [mode, setMode] = useState(
    sessionStorage.getItem('mode') === 'true' ||
      sessionStorage.getItem('mode') === null
      ? true
      : false
  )

  // For wall images
  const [index, setIndex] = useState(0)

  // For switching between movie & tv
  const [movieState, setMovieState] = useState(true)

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
  const viewerRef = useRef(null)
  const innerViewerRef = useRef(null)

  // action, popular, war ...
  const [activeOption, setActiveOption] = useState(false)

  // movie / tv
  const [optionState, setOptionState] = useState(
    sessionStorage.getItem('movieState') || 'movie'
  )
  const [searchOptionState, setSearchOptionState] = useState('movie')

  // search query
  const [searchQuery, setSearchQuery] = useState(
    sessionStorage.getItem('searchQuery') || ''
  )

  // search results component
  const searchInputRef = useRef(null)
  const searchResultsRef = useRef(null)

  const headerRef = useRef(null)

  const searchIconRef = useRef(null)
  const searchModalRef = useRef(null)
  const clearMovieInputRef = useRef(null)
  const clearTvInputRef = useRef(null)

  // Backdrop Index
  const [backdropIndex, setBackdropIndex] = useState(0)

  // Backdrops states
  const [backdrops, setBackdrops] = useState([])
  const [backdropsLoading, setBackdropsLoading] = useState(false)
  const [backdropsError, setBackdropsError] = useState('')

  const [type, setType] = useState(sessionStorage.getItem('movieState'))

  const [movieIdState, setMovieIdState] = useState(false)

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

        searchOptionState,
        setSearchOptionState,

        searchQuery,
        setSearchQuery,

        searchInputRef,
        searchResultsRef,

        headerRef,

        searchIconRef,
        searchModalRef,
        clearMovieInputRef,
        clearTvInputRef,

        type,
        setType,

        movieIdState,
        setMovieIdState,

        viewerRef,
        innerViewerRef,

        backdropIndex,
        setBackdropIndex,
        backdrops,
        setBackdrops,
        backdropsError,
        setBackdropsError,
        backdropsLoading,
        setBackdropsLoading
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
