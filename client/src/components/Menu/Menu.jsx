import React, { useEffect } from 'react'

// react router dom
import { Link, useNavigate } from 'react-router-dom'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../../redux/services/movies/getMovies'
import { getTvShows } from '../../redux/services/shows/getTvShows'

// contetx
import { useMovieContext } from '../../context/context'

// data
import { iconsData } from '../../data/icons'
import { genreArray } from '../../data/genreData'
import { tvGenreArray } from '../../data/tvGenreData'
import { categoryArray } from '../../data/categoryData'

// hooks
import { useShowHide } from '../../hooks/useShowHide'

const Menu = () => {
  const {
    mode,
    movieState,
    menuIconRef,
    menuRef,
    menuInnerRef,
    menuState,
    setMenuState,
    activeOption,
    setActiveOption,
    setIndex
  } = useMovieContext()
  const { showMenu, hideMenu } = useShowHide()
  const dispatch = useDispatch()
  const savedMovies = useSelector(state => state.savedMovies.savedMovies)
  const savedShows = useSelector(state => state.savedShows.savedShows)

  const navigate = useNavigate()

  // Toggle logout & Detect outside click of logout component
  useEffect(() => {
    const toggleMenu = e => {
      if (menuInnerRef.current.contains(e.target)) {
        return
      } else if (!menuIconRef.current) {
        setMenuState(false)
        return
      } else if (!menuIconRef.current.contains(e.target)) {
        setMenuState(false)
      } else {
        setMenuState(!menuState)
      }
    }

    if (menuState) {
      showMenu(menuRef)
    } else {
      hideMenu(menuRef)
    }

    document.body.addEventListener('click', toggleMenu)

    return () => {
      document.body.removeEventListener('click', toggleMenu)
    }
  }, [menuState])

  const handleCategoryClick = (category, value) => {
    setIndex(0)
    sessionStorage.setItem('page', 1)
    setActiveOption(!activeOption)
    setMenuState(false)
    //sessionStorage.setItem('option', category)

    if (
      category === 'theatres' &&
      sessionStorage.getItem('movieState') === 'tv'
    ) {
      sessionStorage.setItem('option', 'On Air')
    } else {
      sessionStorage.setItem('option', value)
    }

    // if (sessionStorage.getItem('movieState') === 'movie') {
    //   dispatch(getMovies(category))
    // } else {
    //   if (category === 'theatres') {
    //     dispatch(getTvShows('air'))
    //     return
    //   }
    //   dispatch(getTvShows(category))
    // }

    navigate('/')
  }

  const handleGenreClick = (id, genre) => {
    setIndex(0)
    sessionStorage.setItem('page', 1)
    sessionStorage.setItem('genreId', id)
    sessionStorage.setItem('option', genre)
    setActiveOption(!activeOption)
    setMenuState(false)

    // if (sessionStorage.getItem('movieState') === 'movie') {
    //   dispatch(getMovies({ value: 'genre', id }))
    // } else {
    //   dispatch(getTvShows({ value: 'genre', id }))
    // }

    navigate('/')
  }

  return (
    <div
      ref={menuRef}
      className={
        'menu ' +
        (mode === true ? 'lightAlpha2 darkColor1' : 'darkAlpha1 lightColor1')
      }
    >
      <div
        className={
          'menu__inner ' +
          (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
        }
        ref={menuInnerRef}
      >
        <div className='title-close '>
          <div className='title'>
            <span className='title__part--1'>Film</span>
            <span
              className={
                'title__icon ' + (mode === true ? 'darkColor1' : 'lightColor1')
              }
            >
              {iconsData.film}
            </span>
            <span className='title__part--2'>ra</span>
          </div>
          <p className='close-icon' onClick={() => setMenuState(false)}>
            <span>
              <i className='fa-solid fa-xmark'></i>
            </span>
          </p>
        </div>

        {/* Category */}
        <span className='category-title'>Categories</span>

        <div className='menu__inner__category '>
          <div className='menu__inner__category__inner'>
            {categoryArray.map((item, index) =>
              item.category === 'watchlist' ? (
                <Link to='/watchlist'>
                  {sessionStorage.getItem('movieState') === 'movie' && (
                    <>
                      <>
                        {item.icon} {item.value}
                      </>
                      <span>{savedMovies.length}</span>
                    </>
                  )}

                  {sessionStorage.getItem('movieState') === 'tv' && (
                    <>
                      <>
                        {item.icon} {item.value}
                      </>
                      <span>{savedShows.length}</span>
                    </>
                  )}
                </Link>
              ) : (
                <p
                  onClick={() => handleCategoryClick(item.category, item.value)}
                  key={index}
                  className={mode === true ? 'lightBg2' : 'darkBg1'}
                >
                  {item.category === 'theatres' &&
                    sessionStorage.getItem('movieState') === 'movie' && (
                      <>
                        {item.icon} {item.value}
                      </>
                    )}

                  {item.category === 'theatres' &&
                    sessionStorage.getItem('movieState') === 'tv' && (
                      <>{item.icon} On Air</>
                    )}

                  {item.category !== 'theatres' && (
                    <>
                      {item.icon} {item.value}
                    </>
                  )}

                  {item.category === 'watchlist' &&
                    sessionStorage.getItem('movieState') === 'movie' && (
                      <span>{savedMovies.length}</span>
                    )}

                  {item.category === 'watchlist' &&
                    sessionStorage.getItem('movieState') === 'tv' && (
                      <span>{savedShows.length}</span>
                    )}
                </p>
              )
            )}
          </div>
        </div>

        {/* Genre */}
        <span className='genre-title'>Genre</span>

        <div className='menu__inner__genre '>
          <div className='menu__inner__genre__inner scroll'>
            {sessionStorage.getItem('movieState') === 'movie'
              ? genreArray.map(item => (
                  <span
                    onClick={() => handleGenreClick(item.id, item.genre)}
                    key={item.id}
                    className={mode === true ? 'lightBg2' : 'darkBg1'}
                  >
                    {item.icon1}
                    {item.genre}
                  </span>
                ))
              : tvGenreArray.map((item, index) => (
                  <span
                    onClick={() => handleGenreClick(item.id, item.genre)}
                    key={index}
                    className={mode === true ? 'lightBg2' : 'darkBg1'}
                  >
                    {item.icon1}
                    {item.genre}
                  </span>
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu
