import React, { useState, useEffect } from 'react'
// import { LazyLoadImage } from 'react-lazy-load-image-component'
// import 'react-lazy-load-image-component/src/effects/blur.css'

// context
import { useMovieContext } from '../../context/context'

// APIs
import { APIs } from '../../APIs/APIs'

// React router dom
import { Link } from 'react-router-dom'

const SearchResults = ({ results }) => {
  const {
    mode,
    searchResultsRef,
    searchInputRef,
    setSearchQuery,
    searchOptionState,
    searchModalRef,
    movieIdState,
    setMovieIdState
  } = useMovieContext()
  const [windowWidth, setWindowWidth] = useState(787)

  window.onresize = () => {
    setWindowWidth(window.innerWidth)
  }

  // Close search results
  useEffect(() => {
    if (windowWidth <= '786') {
      setSearchQuery('')
    }

    const closeSearchResults = e => {
      if (e.target.nodeName !== 'INPUT' && window.innerWidth > 786) {
        setSearchQuery('')
      }
    }

    document.body.addEventListener('click', closeSearchResults)

    return () => {
      document.body.removeEventListener('click', closeSearchResults)
    }
  }, [windowWidth])

  const hideModal = () => {
    setMovieIdState(!movieIdState)
    setSearchQuery('')
    searchModalRef.current.style.zIndex = '-1'
    searchModalRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={searchResultsRef}
      className={
        'search__results scroll-1 ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
      }
    >
      <div className='search__results__inner'>
        {results.map((result, index) => (
          <Link
            onClick={() => hideModal()}
            to={`/${searchOptionState}/${result.id}`}
            key={index}
            className={
              'search__results__inner__card ' +
              (mode === true ? 'lightBg1' : 'darkBg2')
            }
          >
            <div className='search__results__inner__card__image'>
              <img
                className='img'
                loading='lazy'
                src={
                  result.poster_path === null
                    ? APIs.no_image_url
                    : APIs.img_path_w185 + result.poster_path
                }
                alt='image'
              />

              {/* <LazyLoadImage
                width={'100%'}
                height={'100%'}
                className='img'
                alt='image'
                effect='blur'
                placeholderSrc={
                  result.poster_path === null
                    ? APIs.no_image_url
                    : APIs.img_path_w185 + result.poster_path
                }
                src={
                  result.poster_path === null
                    ? APIs.no_image_url
                    : APIs.img_path_w185 + result.poster_path
                }
              /> */}
            </div>
            <div className='search__results__inner__card__title-date'>
              <span className={mode === true ? 'darkColor1' : 'lightColor1'}>
                {result.title ? result.title : result.name}
              </span>
              <span>
                {result.release_date && result.release_date.substring(0, 4)}

                {result.first_air_date && result.first_air_date.substring(0, 4)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SearchResults
