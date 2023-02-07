import React, { useState, useEffect, useRef } from 'react'

// Sort Data
import { sortArray } from '../../../data/sortData'

// Redux
import { useSelector } from 'react-redux'

// Context
import { useMovieContext } from '../../../context/context'

// Hooks
import { useSortFilter } from '../../../hooks/useSortFilter'
import { useShowHide } from '../../../hooks/useShowHide'

const Sort = () => {
  const { sortState } = useSelector(state => state.movies)
  const { mode, setIndex } = useMovieContext()
  const { sortMovies } = useSortFilter()
  const { showSort, hideSort } = useShowHide()

  // States
  const [open, setOpen] = useState(false)

  // Ref's
  const btnRef = useRef(null)
  const sortRef = useRef(null)
  const openRef = useRef(null)
  const closeRef = useRef(null)

  // Detect outside click of Filter Menu
  useEffect(() => {
    const closeSort = e => {
      if (!sortRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    if (open) {
      showSort(btnRef, closeRef)
    } else {
      hideSort(btnRef, closeRef)
    }

    document.body.addEventListener('click', closeSort)

    return () => {
      document.body.removeEventListener('click', closeSort)
    }
  }, [open])

  // Toggleort
  const toggleMenu = () => {
    setOpen(!open)

    if (open) {
      showSort(btnRef, closeRef)
    } else {
      hideSort(btnRef, closeRef)
    }
  }

  return (
    <div ref={sortRef} className='sort'>
      <div
        ref={openRef}
        className={
          'sort__open ' +
          (mode === true ? 'lightBg2 darkColor1' : 'darkBg1 lightColor1')
        }
        onClick={toggleMenu}
      >
        <span>{sortState}</span>

        <span>
          <i className='fa-solid fa-chevron-down' ref={btnRef}></i>
        </span>
      </div>

      <div
        ref={closeRef}
        className={mode === true ? 'sort__close ' : 'sort__close '}
      >
        {sortArray.map((sort, index) => (
          <span
            className={
              mode === true ? ' lightBg2 darkColor1' : ' darkBg1 lightColor1'
            }
            onClick={() => {
              sortMovies(sort.id)
              toggleMenu()
              setIndex(0)
            }}
            key={index}
          >
            {sort.icon} {sort.value}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Sort
