//import React, { useState, useEffect, useRef } from 'react'
import React, { useRef } from 'react'

// Hooks
import { useGetClassByVote } from '../../hooks/useGetClassByVote'

// APIs
import { APIs } from '../../APIs/APIs'

// React Router
import { Link } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'

// Context
import { useMovieContext } from '../../context/context'

// components
import TvCard from './TvCard/TvCard'
import Pagination from './Pagination/Pagination'
import Sort from './Sort/Sort'
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'

import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos
} from 'react-icons/md'

const TvList = () => {
  const { mode, index, setIndex } = useMovieContext()
  const { getClassBg } = useGetClassByVote()
  const shows = useSelector(state => state.tvShows.sortedShows)
  const sortedShows = useSelector(state => state.tvShows.sortedShows)
  const loading = useSelector(state => state.tvShows.loading)
  const error = useSelector(state => state.tvShows.error)
  const user = useSelector(state => state.watchlist.user)

  // const [stop, setStop] = useState(0)
  // const timeoutRef = useRef(null)
  const btnRef = useRef(null)
  const infoRef = useRef(null)

  const previousImage = () => {
    index < 1
      ? setIndex(sortedShows.length - 1)
      : setIndex(prevIndex => prevIndex - 1)
  }

  const nextImage = () => {
    index === sortedShows.length - 1
      ? setIndex(0)
      : setIndex(prevIndex => prevIndex + 1)
  }

  if (loading) {
    return (
      <div className='loading'>
        <Loading />
      </div>
    )
  }

  if (user && window.location.pathname === '/watchlist' && error.isError) {
    return (
      <div className='error'>
        <Error msg={error.msg} />
      </div>
    )
  }

  if (
    user &&
    window.location.pathname === '/watchlist' &&
    movies &&
    movies.length === 0 &&
    sortedShows &&
    sortedShows.length === 0
  ) {
    return (
      <div className='error'>
        <Error msg={'Add movies to watchlist'} />
      </div>
    )
  }

  if (!user && window.location.pathname === '/watchlist') {
    return (
      <div className='error'>
        <Error msg={'Login to see your watchlist'} />
      </div>
    )
  }

  if (error.isError) {
    return (
      <div className='error'>
        <Error msg={error.msg} />
      </div>
    )
  }

  return (
    <div className='list'>
      {sortedShows && sortedShows.length > 0 && (
        <>
          <div
            className={'list__wall ' + (mode === true ? 'lightBg2' : 'darkBg2')}
            onMouseOver={() => {
              //clearTimeout(timeoutRef.current)
              //setStop(1)
              //btnRef.current.style.zIndex = '1'
            }}
            onMouseLeave={() => {
              //setStop(0)
              //btnRef.current.style.zIndex = '-1'
            }}
          >
            <img
              className='list__wall--image'
              src={
                sortedShows[index].backdrop_path === null
                  ? APIs.no_image_url
                  : APIs.img_path + sortedShows[index].backdrop_path
              }
              alt={sortedShows[index].name}
            />

            <Link
              to={`/tv/${sortedShows[index].id}`}
              className={
                'list__wall__cover ' +
                (mode === true
                  ? 'lightGradient1 darkColor2'
                  : 'darkGradient1 lightColor1')
              }
              // onMouseOver={() => {
              //   //clearTimeout(timeoutRef.current)
              //   //setStop(1)
              //   btnRef.current.style.zIndex = '1'
              // }}
              // onMouseLeave={() => {
              //   //setStop(0)
              //   btnRef.current.style.zIndex = '-1'
              // }}
            >
              <p className={'list__wall__cover--number '}>
                {index + 1 + ' / ' + sortedShows.length}
              </p>

              <div className='list__wall__cover__info'>
                <div className='list__wall__cover__info__rating-title'>
                  {sortedShows.length > 0 && (
                    <>
                      <p
                        className={
                          'rating ' +
                          getClassBg(sortedShows[index].vote_average)
                        }
                      >
                        <span>
                          {sortedShows[index].vote_average.toFixed(1)}
                        </span>
                      </p>
                      <span className='title'>{sortedShows[index].name}</span>
                    </>
                  )}
                </div>
                <p className='list__wall__cover__info--overview'>
                  {sortedShows[index].overview ? (
                    sortedShows[index].overview.length > 245 ? (
                      sortedShows[index].overview.substring(0, 248) + ' .....'
                    ) : (
                      sortedShows[index].overview
                    )
                  ) : (
                    <></>
                  )}
                </p>
              </div>
            </Link>

            <div ref={btnRef} className='list__wall__buttons'>
              {/* ref={btnRef} */}
              {sortedShows.length > 1 ? (
                <>
                  <MdOutlineArrowBackIosNew
                    cursor={'pointer'}
                    size={'20px'}
                    style={{
                      marginLeft: '1rem',
                      color: '#fff',
                      background: 'rgba(0, 0, 0, 0.8)',
                      padding: '0.5rem',
                      borderRadius: '50%'
                    }}
                    onClick={previousImage}
                  />
                  <MdOutlineArrowForwardIos
                    cursor={'pointer'}
                    size={'20px'}
                    style={{
                      marginRight: '1rem',
                      color: '#fff',
                      background: 'rgba(0, 0, 0, 0.8)',
                      padding: '0.5rem',
                      borderRadius: '50%'
                    }}
                    onClick={nextImage}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}

      {sortedShows && sortedShows.length > 0 && <Sort />}

      <div className='list__movies'>
        {sortedShows &&
          sortedShows.length > 0 &&
          sortedShows.map((tv, index) => <TvCard key={index} tv={tv} />)}
      </div>

      {window.location.pathname !== '/watchlist' &&
        window.location.pathname !== '/search' && (
          <div className='pagination'>
            <Pagination data={sortedShows} pageLimit={5} dataLimit={20} />
          </div>
        )}
    </div>
  )
}

export default TvList
