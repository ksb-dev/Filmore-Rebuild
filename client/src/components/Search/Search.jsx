import React from 'react'

// react-router-dom
import { useNavigate } from 'react-router-dom'

// context
import { useMovieContext } from '../../context/context'

// data
import { iconsData } from '../../data/icons'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { getMovieResults } from '../../redux/services/movies/getMovieResults'
import { getTvResults } from '../../redux/services/shows/getTvResults'

// components
import SearchResults from '../SearchResults/SearchResults'
import Options from '../../other/Options/Options'

const Search = () => {
  const movieResults = useSelector(state => state.movieResults.movieResults)
  const tvResults = useSelector(state => state.tvResults.tvResults)

  const {
    setIndex,
    searchQuery,
    setSearchQuery,
    optionState,
    searchInputRef,
    movieState,
    setMovieState
  } = useMovieContext()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    sessionStorage.setItem('searchQuery', searchQuery)
    setIndex(0)
    sessionStorage.setItem('searchPage', 1)

    setSearchQuery('')
    setMovieState(!movieState)

    navigate('/search')
  }

  return (
    <div className='search__component'>
      <div className='search__component__switch'>
        <Options />
      </div>
      <div className='search__component__search-bar'>
        <form onSubmit={e => handleSubmit(e)}>
          <input
            ref={searchInputRef}
            type='text'
            placeholder={optionState === 'movie' ? 'Search Movie' : 'Search Tv'}
            onChange={e => {
              setSearchQuery(e.target.value)
              //sessionStorage.setItem('searchQuery', searchQuery)
              if (sessionStorage.getItem('movieState') === 'movie') {
                dispatch(getMovieResults(searchQuery))
              }

              if (sessionStorage.getItem('movieState') === 'tv') {
                dispatch(getTvResults(searchQuery))
              }
            }}
            value={searchQuery}
          />
          {sessionStorage.getItem('movieState') === 'movie' && searchQuery && (
            <span
              onClick={() => {
                setSearchQuery('')
                //sessionStorage.removeItem('searchQuery')
              }}
              style={{ cursor: 'pointer', color: 'red' }}
            >
              {iconsData.close2}
            </span>
          )}

          {sessionStorage.getItem('movieState') === 'tv' && searchQuery && (
            <span
              onClick={() => {
                setSearchQuery('')
                //sessionStorage.removeItem('searchQuery')
              }}
              style={{ cursor: 'pointer', color: 'red' }}
            >
              {iconsData.close2}
            </span>
          )}

          {!searchQuery && <span>{iconsData.searchIcon}</span>}
        </form>
      </div>

      {sessionStorage.getItem('movieState') === 'movie' &&
        searchQuery &&
        movieResults &&
        movieResults.length > 0 && <SearchResults results={movieResults} />}

      {sessionStorage.getItem('movieState') === 'tv' &&
        searchQuery &&
        tvResults &&
        tvResults.length > 0 && <SearchResults results={tvResults} />}
    </div>
  )
}

export default Search
