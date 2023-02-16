import React from 'react'

// context
import { useMovieContext } from '../../context/context'

// APIs
import { APIs } from '../../APIs/APIs'

const SearchResults = ({ results }) => {
  const { mode, searchResultsRef } = useMovieContext()

  console.log(results[0])

  return (
    <div
      className={
        'search__results scroll-1 ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
      }
    >
      <div className='search__results__inner'>
        {results.map((result, index) => (
          <div key={index} className='search__results__inner__card'>
            <div className='search__results__inner__card__image'>
              <img
                src={
                  result.poster_path === null
                    ? APIs.no_image_url
                    : APIs.img_path + result.poster_path
                }
                alt='image'
              />
            </div>
            <div className='search__results__inner__card__title-date'>
              <span>{result.title ? result.title : result.name}</span>
              <span>
                {result.release_date
                  ? result.release_date
                  : result.first_air_date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResults
