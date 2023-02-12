import React from 'react'

// data
import { iconsData } from '../../../data/icons'
// context
import { useMovieContext } from '../../../context/context'

// react router dom
import { Link } from 'react-router-dom'

// redux
import { useDispatch } from 'react-redux'
import { getMovies } from '../../../redux/services/movies/getMovies'

const SmallHeader = () => {
  const { setIndex, movieState, setMovieState } = useMovieContext()
  const dispatch = useDispatch()

  // Title Click
  const handleTitleClick = () => {
    setMovieState(!movieState)
    sessionStorage.setItem('movieState', 'movie')
    sessionStorage.removeItem('genreId')
    sessionStorage.removeItem('option')
    sessionStorage.setItem('page', 1)
    sessionStorage.setItem('term', '')
    setIndex(0)
    dispatch(getMovies('popular'))
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
            <span className='title__part--1'>Film</span>
            <span className='title__icon'>{iconsData.film}</span>
            <span className='title__part--2'>ra</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SmallHeader
