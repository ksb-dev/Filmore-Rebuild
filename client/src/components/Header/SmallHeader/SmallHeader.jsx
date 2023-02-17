import React from 'react'

// Recat router dom
import { useNavigate } from 'react-router-dom'

// data
import { iconsData } from '../../../data/icons'

// context
import { useMovieContext } from '../../../context/context'

// react router dom
import { Link } from 'react-router-dom'

// redux
import { useDispatch } from 'react-redux'

const SmallHeader = () => {
  const {
    setIndex,
    movieState,
    setMovieState,
    setOptionState,
    setSearchQuery
  } = useMovieContext()
  const navigate = useNavigate()

  // Title Click
  const handleTitleClick = () => {
    sessionStorage.setItem('movieState', 'movie')
    setOptionState('movie')
    sessionStorage.removeItem('genreId')
    sessionStorage.removeItem('option')
    sessionStorage.removeItem('searchQuery')
    setSearchQuery('')
    sessionStorage.setItem('page', 1)
    setIndex(0)
    setMovieState(!movieState)

    navigate('/')
  }

  return (
    <div className='small-header'>
      <div className='small-header__options'>
        <div className='title'>
          <Link
            to='/'
            className='title '
            onClick={() => {
              handleTitleClick()
            }}
          >
            <span>TMDb</span>
          </Link>
        </div>

        {/* <Search /> */}

        <span className='search-icon'>{iconsData.searchIcon}</span>
      </div>
    </div>
  )
}

export default SmallHeader
