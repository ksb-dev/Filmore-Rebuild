import React, { useState } from 'react'

// Recat router dom
import { useNavigate } from 'react-router-dom'

// data
import { iconsData } from '../../../data/icons'

// context
import { useMovieContext } from '../../../context/context'

// react router dom
import { Link } from 'react-router-dom'

const SmallHeader = () => {
  const {
    setIndex,
    movieState,
    setMovieState,
    setOptionState,
    setSearchQuery,
    searchIconRef,
    searchModalRef,
    showCloseBtn,
    setShowCloseBtn
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

  const showModal = () => {
    setShowCloseBtn(true)
    //setSearchQuery('')
    searchModalRef.current.style.zIndex = '6'
    searchModalRef.current.style.opacity = '1'
  }

  const hideModal = () => {
    setShowCloseBtn(false)
    setSearchQuery('')
    searchModalRef.current.style.zIndex = '-1'
    searchModalRef.current.style.opacity = '0'
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

        {showCloseBtn ? (
          <span
            ref={searchIconRef}
            className='search-icon'
            onClick={() => hideModal()}
          >
            {iconsData.close}
          </span>
        ) : (
          <span
            ref={searchIconRef}
            className='search-icon'
            onClick={() => showModal()}
          >
            {iconsData.searchIcon}
          </span>
        )}
      </div>
    </div>
  )
}

export default SmallHeader
