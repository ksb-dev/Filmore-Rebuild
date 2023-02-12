import React from 'react'

// Context
import { useMovieContext } from '../../../context/context'

// Redux
import { useSelector } from 'react-redux'

const Pagination = () => {
  const { mode, movieState, setMovieState } = useMovieContext()
  const totalPages = useSelector(state => state.tvShows.totalPages)

  const storedPage = Number(sessionStorage.getItem('page'))
  const number = storedPage !== 0 ? storedPage : 1

  const check = () => {
    setMovieState(!movieState)
  }

  // Next and Prev
  const goToPage = value => {
    let pageNumber = sessionStorage.getItem('page')

    if (value === 'prev') {
      sessionStorage.setItem('page', Number(pageNumber) - 1)
    } else {
      sessionStorage.setItem('page', Number(pageNumber) + 1)
    }

    check()
  }

  const getPaginationGroup = () => {
    let start = Math.floor((number - 1) / 5) * 5

    if (start + 5 < totalPages) {
      return new Array(5).fill().map((_, idx) => start + idx + 1)
    }

    return new Array(Math.abs(start - totalPages))
      .fill()
      .map((_, idx) => start + idx + 1)
  }

  // Change page
  const changePage = e => {
    const pageNumber = Number(e.target.textContent)
    sessionStorage.setItem('page', pageNumber)

    check()
  }

  return (
    <div className='tv__buttons'>
      {totalPages ? (
        <button
          onClick={() => goToPage('prev')}
          className={
            'tv__buttons--prevBtn ' +
            (number === 1
              ? 'disabledBtn '
              : mode === true
              ? 'primaryBg '
              : 'primaryBg ')
          }
        >
          <i className='fa-solid fa-chevron-left'></i>
        </button>
      ) : (
        <></>
      )}

      {getPaginationGroup().map((item, index) => (
        <button
          className={
            'tv__buttons--btn ' +
            (number === item
              ? mode === true
                ? 'primaryBg '
                : 'primaryBg '
              : mode === true
              ? 'lightBg2 darkColor1'
              : 'darkBg1 lightColor1')
          }
          onClick={changePage}
          key={index}
        >
          <span>{item}</span>
        </button>
      ))}

      {totalPages && number !== totalPages ? (
        <button
          onClick={() => goToPage('next')}
          className={
            'tv__buttons--nextBtn ' +
            (mode === true ? 'primaryBg' : 'primaryBg')
          }
        >
          <i className='fa-solid fa-chevron-right'></i>
        </button>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Pagination
