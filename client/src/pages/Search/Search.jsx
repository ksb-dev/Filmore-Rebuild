import React, { useEffect } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getMovies } from '../../redux/services/getMovies'
import { setWatchlist } from '../../redux/services/setWatchlist'

// context
import { useMovieContext } from '../../context/context'

// components
import Header from '../../components/Header/Header'

const Search = () => {
  const { mode } = useMovieContext()
  const dispatch = useDispatch()

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    const savedToken = sessionStorage.getItem('token')

    if (savedToken !== '' || savedToken !== undefined || savedToken !== null) {
      dispatch(setWatchlist())
    }

    dispatch(getMovies('upcoming'))
  }, [dispatch])

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
