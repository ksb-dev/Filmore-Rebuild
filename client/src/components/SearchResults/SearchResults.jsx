import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

// context
import { useMovieContext } from '../../context/context'

// APIs
import { APIs } from '../../APIs/APIs'

const SearchResults = ({ results }) => {
  const { mode, searchResultsRef, searchInputRef, setSearchQuery } =
    useMovieContext()
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

  return (
    <div
      ref={searchResultsRef}
      className={
        'search__results scroll-1 ' +
        (mode === true ? 'lightBg2 darkColor1' : 'darkBg1 lightColor1')
      }
    >
      <div className='search__results__inner'>
        {results.map((result, index) => (
          <div
            key={index}
            className={
              'search__results__inner__card ' +
              (mode === true ? 'lightBg2' : 'darkBg1')
            }
          >
            <div className='search__results__inner__card__image'>
              {/* <img
                src={
                  result.poster_path === null
                    ? APIs.no_image_url
                    : APIs.img_path + result.poster_path
                }
                alt='image'
              /> */}

              <LazyLoadImage
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
              />
            </div>
            <div className='search__results__inner__card__title-date'>
              <span>{result.title ? result.title : result.name}</span>
              <span>
                {result.release_date && result.release_date.substring(0, 4)}

                {result.first_air_date && result.first_air_date.substring(0, 4)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResults
