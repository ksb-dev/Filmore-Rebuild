import React, { useState, useEffect } from 'react'

// data
import { iconsData } from '../../data/icons'

// context
import { useMovieContext } from '../../context/context'

// components
import Search from '../Search/Search'

const SearchModal = () => {
  const {
    mode,
    searchModalRef,
    searchIconRef,
    searchResultsRef,
    searchInputRef,
    clearMovieInputRef,
    clearTvInputRef,
    setSearchQuery
  } = useMovieContext()

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
    }
  }, [windowWidth])

  // useEffect(() => {
  //   const toggleSearchModal = e => {
  //     if (
  //       !searchIconRef.current.contains(e.target) &&
  //       searchInputRef.current &&
  //       !searchInputRef.current.contains(e.target)
  //     ) {
  //       setSearchQuery('')
  //       searchModalRef.current.style.zIndex = '-1'
  //       searchModalRef.current.style.opacity = '0'
  //     }
  //   }

  //   document.body.addEventListener('click', toggleSearchModal)

  //   return () => {
  //     document.body.removeEventListener('click', toggleSearchModal)
  //   }
  // }, [])

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

      <p className='search__modal__close' onClick={() => hideModal()}>
        <span>{iconsData.close1}</span>
      </p>
    </div>
  )
}

export default SearchModal
