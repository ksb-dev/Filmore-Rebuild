import React, { useState, useEffect, useRef } from 'react'

// context
import { useMovieContext } from '../../context/context'

// hooks
import { useShowHide } from '../../hooks/useShowHide'

const Options = () => {
  const [open, setOpen] = useState(false)
  const btnRef = useRef(null)
  const optionRef = useRef(null)
  const closeRef = useRef(null)

  const { setSearchQuery, searchOptionState, setSearchOptionState } =
    useMovieContext()
  const { showOption, hideOption } = useShowHide()

  useEffect(() => {
    const toggleSort = e => {
      //setOpen(false)

      if (optionRef.current && !optionRef.current.contains(e.target)) {
        setOpen(false)
      } else {
        setOpen(!open)
      }
    }

    if (open) {
      showOption(btnRef, closeRef)
    } else {
      hideOption(btnRef, closeRef)
    }

    document.body.addEventListener('click', toggleSort)

    return () => {
      document.body.removeEventListener('click', toggleSort)
    }
  }, [open])

  const handleOptionState = () => {
    setSearchQuery('')
    if (searchOptionState === 'movie') {
      setSearchOptionState('tv')
    } else {
      setSearchOptionState('movie')
    }
  }

  return (
    <div>
      <div className='option__main' ref={optionRef}>
        <div className='option__main__current'>
          <span>{searchOptionState}</span>
          <span className='option__main__current__icon'>
            <i className='fa-solid fa-chevron-down' ref={btnRef}></i>
          </span>
        </div>
        <div
          className='option__main__option'
          ref={closeRef}
          onClick={() => handleOptionState()}
        >
          <span>{searchOptionState === 'movie' ? 'tv' : 'movie'}</span>
        </div>
      </div>
    </div>
  )
}

export default Options
