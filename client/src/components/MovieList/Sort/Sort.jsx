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

  // Toggle sort & Detect outside click of sort component
  useEffect(() => {
    const toggleSort = e => {
      if (!sortRef.current.contains(e.target)) {
        setOpen(false)
      } else {
        setOpen(!open)
      }
    }

    if (open) {
      showSort(btnRef, closeRef)
    } else {
      hideSort(btnRef, closeRef)
    }

    document.body.addEventListener('click', toggleSort)

    return () => {
      document.body.removeEventListener('click', toggleSort)
    }
  }, [open])

  return (
    <div ref={sortRef} className='sort'>
      <div
        ref={openRef}
        className={
          'sort__open ' +
          (mode === true
            ? 'lightBg1 darkColor2 blackBorder'
            : 'darkBg2 lightColor1 whiteBorder')
        }
      >
        <span>{sortState}</span>

        <span>
          <i className='fa-solid fa-chevron-down' ref={btnRef}></i>
        </span>
      </div>

      <div
        ref={closeRef}
        className={
          mode === true
            ? 'sort__close lightBg1 blackBorder'
            : 'sort__close darkBg2 whiteBorder'
        }
      >
        {sortArray.map((sort, index) => (
          <span
            className={
              mode === true ? ' lightBg1 darkColor2' : ' darkBg2 lightColor1'
            }
            onClick={() => {
              sortMovies(sort.id)
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
