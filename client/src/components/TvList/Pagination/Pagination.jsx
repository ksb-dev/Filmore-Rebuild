import React from 'react'

// Context
import { useMovieContext } from '../../../context/context'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import {
  setShowsDefault,
  getTvShows
} from '../../../redux/services/shows/getTvShows'

const Pagination = () => {
  const { mode } = useMovieContext()
  const totalPages = useSelector(state => state.tvShows.totalPages)
  //const [pages] = useState(Math.round(data.length / dataLimit))
  const dispatch = useDispatch()

  const storedPage = Number(sessionStorage.getItem('page'))
  const number = storedPage !== 0 ? storedPage : 1

  const goToPage = value => {
    dispatch(setShowsDefault('All'))

    let pageNumber = sessionStorage.getItem('page')

    if (value === 'prev') {
      sessionStorage.setItem('page', Number(pageNumber) - 1)
    } else {
      sessionStorage.setItem('page', Number(pageNumber) + 1)
    }

    const term = sessionStorage.getItem('term')

    const genreId = Number(sessionStorage.getItem('genreId'))

    if (genreId) {
      dispatch(getTvShows({ value: 'genre', id: genreId }))
    } else if (term && window.location.pathname === '/search') {
      dispatch(getTvShows({ value: 'search', query: term }))
    } else if (window.location.pathname === '/') {
      dispatch(getTvShows('popular'))
    } else if (window.location.pathname === '/upcoming') {
      dispatch(getTvShows('air'))
    } else {
      dispatch(getTvShows('top'))
    }
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

  const changePage = e => {
    dispatch(setShowsDefault('All'))

    const pageNumber = Number(e.target.textContent)

    sessionStorage.setItem('page', pageNumber)
    const term = sessionStorage.getItem('term')

    const genreId = Number(sessionStorage.getItem('genreId'))

    if (genreId) {
      dispatch(getTvShows({ value: 'genre', id: genreId }))
    } else if (term && window.location.pathname === '/search') {
      dispatch(getTvShows({ value: 'search', query: term }))
    } else if (window.location.pathname === '/') {
      dispatch(getTvShows('popular'))
    } else if (window.location.pathname === '/upcoming') {
      dispatch(getTvShows('air'))
    } else {
      dispatch(getTvShows('top'))
    }
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
