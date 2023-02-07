import React from 'react'

// Context
import { useMovieContext } from '../../../context/context'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { setDefault, getTvShows } from '../../../redux/services/getTvShows'

const Pagination = () => {
  const { mode } = useMovieContext()
  const totalPages = useSelector(state => state.tvShows.totalPages)
  //const [pages] = useState(Math.round(data.length / dataLimit))
  const dispatch = useDispatch()

  const storedPage = Number(sessionStorage.getItem('page'))
  const number = storedPage !== 0 ? storedPage : 1

  const goToPage = value => {
    dispatch(setDefault('All'))

    let pageNumber = sessionStorage.getItem('page')

    if (value === 'prev') {
      sessionStorage.setItem('page', Number(pageNumber) - 1)
    } else {
      sessionStorage.setItem('page', Number(pageNumber) + 1)
    }

    const term = sessionStorage.getItem('term')

    if (term && window.location.pathname === '/search') {
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
    dispatch(setDefault('All'))

    const pageNumber = Number(e.target.textContent)

    sessionStorage.setItem('page', pageNumber)
    const term = sessionStorage.getItem('term')

    if (term && window.location.pathname === '/search') {
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
    <div className='buttons'>
      {totalPages ? (
        <button
          onClick={() => goToPage('prev')}
          className={
            'buttons--prevBtn ' +
            (mode === true
              ? `${number === 1 ? 'disabledBtn' : 'activeBtn'}`
              : `${number === 1 ? 'disabledBtn' : 'activeBtn'}`)
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
            'buttons--btn ' +
            (mode === true
              ? `${number === item ? 'activeBtn' : 'darkBg2 lightColor1'} `
              : `${number === item ? 'activeBtn' : 'lightBg1 darkColor1'} `)
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
          className='buttons--nextBtn activeBtn'
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
