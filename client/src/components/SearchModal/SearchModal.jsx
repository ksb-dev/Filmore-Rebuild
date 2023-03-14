import React, { useState, useEffect } from 'react'

// data
import { iconsData } from '../../data/icons'

// context
import { useMovieContext } from '../../context/context'

// components
import Search from '../Search/Search'

const SearchModal = () => {
  const { mode, searchModalRef, setSearchQuery, setShowCloseBtn } =
    useMovieContext()

  const [windowWidth, setWindowWidth] = useState(0)

  window.onresize = () => {
    setWindowWidth(window.innerWidth)
  }

  const hideModal = () => {
    setSearchQuery('')
    searchModalRef.current.style.zIndex = '-1'
    searchModalRef.current.style.opacity = '0'
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth)

    if (windowWidth >= 786) {
      hideModal()
      setShowCloseBtn(false)
    }
  }, [windowWidth])

  return (
    <div
      ref={searchModalRef}
      className={
        'search__modal ' + (mode === true ? 'lightAlpha6' : 'darkAlpha6')
      }
    >
      <div className='search__modal__inner'>
        <Search />
      </div>
    </div>
  )
}

export default SearchModal
