import React, { useState, useRef } from 'react'

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
import Card from '../Card/Card'
import Pagination from '../../components/Pagination/Pagination'
import Sort from '../../components/Sort/Sort'
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'

// Rect Icons
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos
} from 'react-icons/md'

// other
import Switch from '../../other/Switch/Switch'

const List = ({ type, playerRef, playerInnerRef }) => {
  const { mode, index, setIndex } = useMovieContext()
  const { getClassBg } = useGetClassByVote()
  // const movies = useSelector(state => state.movies.movies)
  // const sortedMovies = useSelector(state => state.movies.sortedMovies)
  // const loading = useSelector(state => state.movies.loading)
  // const error = useSelector(state => state.movies.error)
  // const user = useSelector(state => state.savedMovies.user)

  let list = ''
  let loading = ''
  let error = ''
  let user = ''

  if (type === 'movie') {
    list = useSelector(state => state.movies.sortedMovies)
    loading = useSelector(state => state.movies.loading)
    error = useSelector(state => state.movies.error)
    user = useSelector(state => state.savedMovies.user)
  } else {
    list = useSelector(state => state.tvShows.sortedShows)
    loading = useSelector(state => state.tvShows.loading)
    error = useSelector(state => state.tvShows.error)
    user = useSelector(state => state.savedShows.user)
  }

  const buttonsRef = useRef(null)
  const numberRef = useRef(null)

  const [stop, setStop] = useState(0)
  const timeoutRef = useRef(null)

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIndex(prevIndex =>
  //       prevIndex === sortedMovies.length - 1 ? 0 : prevIndex + 1
  //     )
  //   }, 2000)

  //   if (stop === 1) {
  //     clearTimeout(timer)
  //   }

  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [index, stop])

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
    // movies &&
    // movies.length === 0 &&
    list &&
    list.length === 0
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

  if (!loading && list && list.length === 0) {
    return (
      <div className='error'>
        <Error msg={'No movies found!'} />
      </div>
    )
  }

  const previousImage = () => {
    index < 1 ? setIndex(list.length - 1) : setIndex(prevIndex => prevIndex - 1)
  }

  const nextImage = () => {
    index === list.length - 1
      ? setIndex(0)
      : setIndex(prevIndex => prevIndex + 1)
  }

  return (
    <div className='list'>
      {list && list.length > 0 && (
        <>
          <div
            className={'list__wall ' + (mode === true ? 'lightBg2' : 'darkBg2')}
          >
            <img
              className='list__wall--image-1'
              src={
                list[index].backdrop_path === null
                  ? APIs.no_image_url
                  : APIs.img_path + list[index].backdrop_path
              }
              alt='img'
              load='lazy'
            />

            <img
              className='list__wall--image-2'
              src={
                list[index].backdrop_path === null
                  ? APIs.no_image_url
                  : APIs.img_path_w780 + list[index].backdrop_path
              }
              alt='img'
              load='lazy'
            />

            <img
              className='list__wall--image-3'
              src={
                list[index].backdrop_path === null
                  ? APIs.no_image_url
                  : APIs.img_path_w780 + list[index].backdrop_path
              }
              alt='img'
              load='lazy'
            />

            <Link
              to={`/${type}/${list[index].id}`}
              className={
                'list__wall__cover ' +
                (mode === true
                  ? 'lightGradient1 darkColor2'
                  : 'darkGradient1 lightColor1')
              }
              onMouseOver={() => {
                //clearTimeout(timeoutRef.current)
                //setStop(1)
                buttonsRef.current.style.zIndex = '1'
                numberRef.current.style.zIndex = '1'
              }}
              onMouseLeave={() => {
                //setStop(0)
                buttonsRef.current.style.zIndex = '-1'
                numberRef.current.style.zIndex = '-1'
              }}
            >
              <p
                //ref={numberRef}
                onMouseOver={() => {
                  numberRef.current.style.zIndex = '1'
                }}
                className={
                  'list__wall__cover--activeOption ' +
                  (mode === true ? 'lightBg2' : 'darkBg1')
                }
              >
                {/* {index + 1 + ' / ' + list.length} */}
                {sessionStorage.getItem('option')}
              </p>

              <div className='list__wall__cover__info'>
                <div className='list__wall__cover__info__title'>
                  {list.length > 0 && (
                    <span className='title'>
                      {type === 'movie' &&
                      list[index].title &&
                      list[index].title.length > 30
                        ? list[index].title.substring(0, 26) + '...'
                        : list[index].title}

                      {type === 'tv' &&
                      list[index].name &&
                      list[index].name.length > 30
                        ? list[index].name.substring(0, 27) + '...'
                        : list[index].name}
                    </span>
                  )}
                </div>

                <p className='list__wall__cover__info--overview'>
                  {list[index].overview ? (
                    list[index].overview.length > 245 ? (
                      list[index].overview.substring(0, 248) + ' .....'
                    ) : (
                      list[index].overview
                    )
                  ) : (
                    <></>
                  )}
                </p>
              </div>
            </Link>

            <span
              className={
                'list__wall--length ' +
                (mode === true ? 'darkBg1 lightColor1' : 'lightBg1 darkColor1')
              }
            >
              {index + 1 + ' / ' + list.length}
            </span>

            <div
              ref={buttonsRef}
              className='list__wall__buttons'
              onMouseOver={() => {
                buttonsRef.current.style.zIndex = '1'
                numberRef.current.style.zIndex = '1'
              }}
            >
              {list.length > 1 ? (
                <>
                  <p
                    onClick={() => previousImage(-1)}
                    className={
                      mode === true
                        ? 'darkBg1 lightColor1'
                        : 'lightBg1 darkColor1'
                    }
                  >
                    <span>
                      <MdOutlineArrowBackIosNew
                        style={{ marginTop: '0.25rem' }}
                      />
                    </span>
                  </p>

                  <p
                    className={
                      'length ' +
                      (mode === true
                        ? 'darkBg1 lightColor1'
                        : 'lightBg1 darkColor1')
                    }
                  >
                    <span>{index + 1 + ' / ' + list.length}</span>
                  </p>

                  <p
                    onClick={() => nextImage(1)}
                    className={
                      mode === true
                        ? 'darkBg1 lightColor1'
                        : 'lightBg1 darkColor1'
                    }
                  >
                    <span>
                      <MdOutlineArrowForwardIos
                        style={{ marginTop: '0.25rem' }}
                      />
                    </span>
                  </p>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}

      <div className='list__sort-activeOption'>
        {list && list.length > 0 && <Sort type={type} />}

        <div className='switch'>{list && list.length > 0 && <Switch />}</div>
      </div>

      <div className='list__movies'>
        {list &&
          list.length > 0 &&
          list.map((card, index) => (
            <Card
              key={index}
              card={card}
              type={type}
              user={user}
              playerRef={playerRef}
              playerInnerRef={playerInnerRef}
            />
          ))}
      </div>

      {window.location.pathname !== '/watchlist' && list && list.length > 0 && (
        <div className='pagination'>
          <Pagination type={type} />
        </div>
      )}
    </div>
  )
}

export default List
