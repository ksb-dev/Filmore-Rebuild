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
import Options from '../../other/Options/Options'
import SearchResults from '../SearchResults/SearchResults'

const Search = () => {
  const movieResults = useSelector(state => state.movieResults.movieResults)
  const tvResults = useSelector(state => state.tvResults.tvResults)

  const {
    setIndex,
    searchQuery,
    setSearchQuery,
    searchOptionState,
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
    <div className={'search__component '}>
      {/* Options */}
      <div className='search__component__switch'>
        <Options />
      </div>

      {/* Search bar */}
      <div className='search__component__search-bar'>
        <form onSubmit={e => handleSubmit(e)} ref={searchInputRef}>
          <input
            type='text'
            placeholder={
              searchOptionState === 'movie' ? 'Search Movie' : 'Search Tv'
            }
            onChange={e => {
              setSearchQuery(e.target.value)

              if (searchOptionState === 'movie') {
                dispatch(getMovieResults(searchQuery))
              }

              if (searchOptionState === 'tv') {
                dispatch(getTvResults(searchQuery))
              }
            }}
            value={searchQuery}
          />
          {searchOptionState === 'movie' && searchQuery && (
            <span
              className='cancel'
              onClick={() => {
                setSearchQuery('')
              }}
            >
              {iconsData.close2}
            </span>
          )}

          {searchOptionState === 'tv' && searchQuery && (
            <span
              className='cancel'
              onClick={() => {
                setSearchQuery('')
              }}
            >
              {iconsData.close2}
            </span>
          )}

          {!searchQuery && <span>{iconsData.searchIcon}</span>}
        </form>
      </div>

      {searchOptionState === 'movie' && searchQuery && (
        <SearchResults results={movieResults} />
      )}

      {searchOptionState === 'tv' && searchQuery && (
        <SearchResults results={tvResults} />
      )}
    </div>
  )
}

export default Search
