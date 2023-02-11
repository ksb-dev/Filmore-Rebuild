import React, { useEffect } from 'react'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { getMovies } from '../../redux/services/movies/getMovies'
import { setSavedMovies } from '../../redux/services/movies/setSavedMovies'
import { getTvShows } from '../../redux/services/shows/getTvShows'
import { setSavedShows } from '../../redux/services/shows/setSavedShows'

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
    setActiveOption
  } = useMovieContext()
  const { showMenu, hideMenu } = useShowHide()
  const dispatch = useDispatch()
  const savedMovies = useSelector(state => state.savedMovies.savedMovies)
  const savedShows = useSelector(state => state.savedShows.savedShows)

  // Toggle logout & Detect outside click of logout component
  useEffect(() => {
    const toggleMenu = e => {
      if (menuInnerRef.current.contains(e.target)) {
        return
      }
      if (!menuIconRef.current.contains(e.target)) {
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

  const handleCategoryClick = category => {
    sessionStorage.setItem('page', 1)
    sessionStorage.setItem('option', category)
    setActiveOption(!activeOption)
    setMenuState(false)

    if (sessionStorage.getItem('movieState') === 'movie') {
      dispatch(getMovies(category))
    } else {
      dispatch(getTvShows(category))
    }
  }

  const handleGenreClick = (id, genre) => {
    sessionStorage.setItem('page', 1)
    sessionStorage.setItem('genreId', id)
    sessionStorage.setItem('option', genre)
    setActiveOption(!activeOption)
    setMenuState(false)

    if (sessionStorage.getItem('movieState') === 'movie') {
      dispatch(getMovies({ value: 'genre', id }))
    } else {
      dispatch(getTvShows({ value: 'genre', id }))
    }
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

        <span className='category-title'>Categories</span>

        <div className='menu__inner__category '>
          <div className='menu__inner__category__inner'>
            {sessionStorage.getItem('movieState') === 'movie'
              ? categoryArray.map((item, index) => (
                  <p
                    onClick={() => handleCategoryClick(item.category)}
                    key={index}
                    className={mode === true ? 'lightBg2' : 'darkBg1'}
                  >
                    {item.category === 'watchlist' &&
                      sessionStorage.getItem('movieState') === 'movie' &&
                      savedMovies && <span>{savedMovies.length}</span>}
                    {item.icon} {item.value}
                  </p>
                ))
              : categoryArray.map((item, index) => (
                  <p
                    onClick={() => handleCategoryClick(item.category)}
                    key={index}
                    className={mode === true ? 'lightBg2' : 'darkBg1'}
                  >
                    {item.category === 'watchlist' &&
                      sessionStorage.getItem('movieState') === 'tv' &&
                      savedShows && <span>{savedShows.length}</span>}
                    {item.icon} {item.value}
                  </p>
                ))}
          </div>
        </div>

        <span className='genre-title'>Genre</span>

        <div className='menu__inner__genre '>
          <div className='menu__inner__genre__inner'>
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
