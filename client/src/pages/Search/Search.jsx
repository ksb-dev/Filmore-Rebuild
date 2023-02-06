import React from 'react'

// context
import { useMovieContext } from '../../context/context'

// components
import Header from '../../components/Header/Header'

const Search = () => {
  const { mode } = useMovieContext()

  return (
    <div
      className={
        'search ' +
        (mode === true ? 'lightBg2 darColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
    </div>
  )
}

export default Search
