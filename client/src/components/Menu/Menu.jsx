import React, { useEffect } from 'react'

// react router dom
import { useNavigate } from 'react-router-dom'

// redux
import { useDispatch, useSelector } from 'react-redux'

// contetx
import { useMovieContext } from '../../context/context'

// data
import { genreArray } from '../../data/genreData'
import { tvGenreArray } from '../../data/tvGenreData'
import { categoryArray } from '../../data/categoryData'

// hooks
import { useShowHide } from '../../hooks/useShowHide'

const Menu = () => {
  const {
    mode,
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
      //if (window.innerWidth > 640) showMenu(menuRef)
      //else menuRef.current.style.transform = 'translateX(0%)'
      showMenu(menuRef, menuInnerRef)
    } else {
      //if (window.innerWidth > 640) hideMenu(menuRef)
      //else menuRef.current.style.transform = 'translateX(-120%)'
      hideMenu(menuRef, menuInnerRef)
    }

    document.body.addEventListener('click', toggleMenu)

    return () => {
      document.body.removeEventListener('click', toggleMenu)
    }
  }, [menuState])

  const handleCategoryClick = (category, value) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    setIndex(0)
    sessionStorage.setItem('page', 1)
    setActiveOption(!activeOption)
    setMenuState(false)
    sessionStorage.removeItem('genreId')

    if (
      category === 'theatres' &&
      sessionStorage.getItem('movieState') === 'tv'
    ) {
      sessionStorage.setItem('option', 'On Air')
    } else {
      sessionStorage.setItem('option', value)
    }

    navigate('/')
  }

  const handleGenreClick = (id, genre) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    setIndex(0)
    sessionStorage.setItem('page', 1)
    sessionStorage.setItem('genreId', id)
    sessionStorage.setItem('option', genre)
    setActiveOption(!activeOption)
    setMenuState(false)

    navigate('/')
  }

  return (
    <div
      ref={menuRef}
      className={
        'menu ' +
        (mode === true ? 'lightAlpha2 darkColor1' : 'darkAlpha2 lightColor1')
      }
    >
      <div
        className={
          'menu__inner ' +
          (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
        }
        ref={menuInnerRef}
      >
        {/* Title-Close */}
        <div className='title-close '>
          <div className='title'>TMDb</div>
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
            {categoryArray.map((item, index) => (
              <p
                onClick={() => handleCategoryClick(item.category, item.value)}
                key={index}
                className={
                  sessionStorage.getItem('option') === `${item.value}` &&
                  !window.location.pathname.includes('/movie') &&
                  !window.location.pathname.includes('/watchlist') &&
                  !window.location.pathname.includes('/register') &&
                  !window.location.pathname.includes('/login')
                    ? 'activeCategory'
                    : mode === true
                    ? 'lightBg2'
                    : 'darkBg1'
                }
              >
                {item.icon}
                {item.category === 'theatres' &&
                sessionStorage.getItem('movieState') === 'tv' ? (
                  <>On Air</>
                ) : (
                  <>{item.value}</>
                )}
              </p>
            ))}
          </div>
        </div>

        {/* Genre */}
        <span className='genre-title'>Genre</span>

        <div className='menu__inner__genre '>
          <div className='menu__inner__genre__inner'>
            {sessionStorage.getItem('movieState') === 'movie'
              ? genreArray.map(item => (
                  <span
                    onClick={() => handleGenreClick(item.id, item.genre)}
                    key={item.id}
                    className={
                      sessionStorage.getItem('option') === `${item.genre}` &&
                      !window.location.pathname.includes('/movie') &&
                      !window.location.pathname.includes('/watchlist') &&
                      !window.location.pathname.includes('/register') &&
                      !window.location.pathname.includes('/login')
                        ? 'activeCategory'
                        : mode === true
                        ? 'lightBg2'
                        : 'darkBg1'
                    }
                  >
                    {item.icon1}
                    {item.genre}
                  </span>
                ))
              : tvGenreArray.map((item, index) => (
                  <span
                    onClick={() => handleGenreClick(item.id, item.genre)}
                    key={index}
                    className={
                      sessionStorage.getItem('option') === `${item.genre}`
                        ? 'activeCategory'
                        : mode === true
                        ? 'lightBg2'
                        : 'darkBg1'
                    }
                  >
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
