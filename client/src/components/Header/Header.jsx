// redux
import { useSelector } from 'react-redux'

// Recat router dom
import { Link, useNavigate } from 'react-router-dom'

// context
import { useMovieContext } from '../../context/context'

// data
import { iconsData } from '../../data/icons'

// components
import Logout from './Logout/Logout'
import Search from '../Search/Search'

// other
import MenuIcon from '../../other/MenuIcon/MenuIcon'

const Header = () => {
  const {
    mode,
    setMode,
    logoutState,
    setIndex,
    movieState,
    setMovieState,
    userIconRef,
    menuIconRef,
    optionState,
    setSearchQuery,
    setOptionState
  } = useMovieContext()

  const user1 = useSelector(state => state.savedMovies.user)
  const user2 = useSelector(state => state.savedShows.user)
  const savedMovies = useSelector(state => state.savedMovies.savedMovies)
  const savedShows = useSelector(state => state.savedShows.savedShows)

  const navigate = useNavigate()

  // Title Click
  const handleTitleClick = () => {
    sessionStorage.setItem('movieState', 'movie')
    setOptionState('movie')
    sessionStorage.removeItem('genreId')
    sessionStorage.removeItem('option')
    sessionStorage.removeItem('searchQuery')
    setSearchQuery('')
    sessionStorage.setItem('page', 1)
    setIndex(0)
    //dispatch(getMovies('Popular'))
    setMovieState(!movieState)

    navigate('/')
  }

  return (
    <div className='header'>
      <div className='header__options'>
        {/* One */}
        <div className='header__options__one'>
          <span
            //to='#'
            className='title '
            onClick={() => {
              handleTitleClick()
            }}
          >
            TMDb
          </span>

          <div className='header-menu-icon'>
            <MenuIcon menuIconRef={menuIconRef} />
          </div>
        </div>

        {window.location.pathname === '/login' ||
        window.location.pathname === '/register' ? (
          <></>
        ) : (
          <div className='header__options__middle'>
            <Search />
          </div>
        )}

        {/* Two */}
        <div className='header__options__two'>
          {window.location.pathname === '/' ? (
            <span
              onClick={() => navigate('/')}
              className='home-icon activeRoute'
            >
              {iconsData.home}
            </span>
          ) : (
            <span onClick={() => navigate('/')} className='home-icon'>
              {iconsData.home}
            </span>
          )}

          {window.location.pathname === '/watchlist' ? (
            <Link to='/watchlist' className='watchlist activeRoute'>
              {iconsData.watchlist}
              <p>
                <span>
                  {optionState === 'movie'
                    ? savedMovies && savedMovies.length
                    : savedShows && savedShows.length}
                </span>
              </p>
            </Link>
          ) : (
            <Link to='/watchlist' className='watchlist'>
              {iconsData.watchlist}
              <p>
                <span>
                  {optionState === 'movie'
                    ? savedMovies && savedMovies.length
                    : savedShows && savedShows.length}
                </span>
              </p>
            </Link>
          )}

          <div ref={userIconRef} className='user'>
            {user1 && user2 ? (
              logoutState ? (
                <div to='#' className='close-icon'>
                  {iconsData.close}
                </div>
              ) : (
                <div to='#' className='user-icon'>
                  {iconsData.user}
                </div>
              )
            ) : window.location.pathname === '/login' ||
              window.location.pathname === '/register' ? (
              <Link to='/login' className='login-icon activeRoute'>
                {iconsData.login}
              </Link>
            ) : (
              <Link to='/login' className='login-icon'>
                {iconsData.login}
              </Link>
            )}

            {/* Logout Component */}
            <Logout />
          </div>

          <span onClick={() => setMode(!mode)} className='mode-icon'>
            {mode === true ? iconsData.sunIcon : iconsData.moonIcon}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Header
