import React from 'react'

// context
import { useMovieContext } from '../../context/context'

const SearchResults = () => {
  const { mode, searchResultsRef } = useMovieContext()

  return (
    <div
      className={
        'search__results ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
      }
    >
      Search Results
    </div>
  )
}

export default SearchResults
