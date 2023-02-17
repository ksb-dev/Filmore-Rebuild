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
import MovieCard from './MovieCard/MovieCard'
import Pagination from './Pagination/Pagination'
import Sort from './Sort/Sort'
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'

// Rect Icons
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos
} from 'react-icons/md'

// other
import Options from '../../other/Options/Options'
import Switch from '../../other/Switch/Switch'

const MovieList = () => {
  const { mode, index, setIndex } = useMovieContext()
  const { getClassBg } = useGetClassByVote()
  const movies = useSelector(state => state.movies.movies)
  const sortedMovies = useSelector(state => state.movies.sortedMovies)
  const loading = useSelector(state => state.movies.loading)
  const error = useSelector(state => state.movies.error)
  const user = useSelector(state => state.savedMovies.user)

  const buttonsRef = useRef(null)

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
    sortedMovies &&
    sortedMovies.length === 0
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

  if (!loading && sortedMovies && sortedMovies.length === 0) {
    return (
      <div className='error'>
        <Error msg={'No movies found!'} />
      </div>
    )
  }

  const previousImage = () => {
    index < 1
      ? setIndex(sortedMovies.length - 1)
      : setIndex(prevIndex => prevIndex - 1)
  }

  const nextImage = () => {
    index === sortedMovies.length - 1
      ? setIndex(0)
      : setIndex(prevIndex => prevIndex + 1)
  }

  return (
    <div className='list'>
      {sortedMovies && sortedMovies.length > 0 && (
        <>
          <div
            className={'list__wall ' + (mode === true ? 'lightBg2' : 'darkBg2')}
          >
            <img
              className='list__wall--image'
              src={
                sortedMovies[index].backdrop_path === null
                  ? APIs.no_image_url
                  : APIs.img_path + sortedMovies[index].backdrop_path
              }
              alt={sortedMovies[index].title}
            />

            <Link
              to={`/movie/${sortedMovies[index].id}`}
              className={
                'list__wall__cover ' +
                (mode === true
                  ? 'lightGradient1 darkColor2'
                  : 'darkGradient1 lightColor1')
              }
            >
              <p className={'list__wall__cover--number '}>
                {index + 1 + ' / ' + sortedMovies.length}
              </p>

              <div className='list__wall__cover__info'>
                <div className='list__wall__cover__info__rating-title'>
                  {sortedMovies.length > 0 && (
                    <>
                      <p
                        className={
                          'rating ' +
                          getClassBg(sortedMovies[index].vote_average)
                        }
                      >
                        <span>
                          {sortedMovies[index].vote_average.toFixed(1)}
                        </span>
                      </p>
                      <span className='title'>{sortedMovies[index].title}</span>
                    </>
                  )}
                </div>
                <p className='list__wall__cover__info--overview'>
                  {sortedMovies[index].overview ? (
                    sortedMovies[index].overview.length > 245 ? (
                      sortedMovies[index].overview.substring(0, 248) + ' .....'
                    ) : (
                      sortedMovies[index].overview
                    )
                  ) : (
                    <></>
                  )}
                </p>
              </div>
            </Link>

            <div ref={buttonsRef} className='list__wall__buttons'>
              {sortedMovies.length > 1 ? (
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

      <div className='list__sort-activeOption'>
        {sortedMovies && sortedMovies.length > 0 && <Sort />}

        <div className='switch'>
          {sortedMovies && sortedMovies.length > 0 && <Switch />}
        </div>

        {/* <span className='activeOption'>
          {window.location.pathname === '/watchlist' && (
            <span className='activeOption'>Watchlist (Movies)</span>
          )}

          {window.location.pathname !== '/watchlist' &&
            window.location.pathname !== '/search' && (
              <span className='activeOption'>
                {sessionStorage.getItem('option') + ' movies'}
              </span>
            )}

          {window.location.pathname === '/search' && (
            <span className='activeOption'>
              {searchQuery + ' (search results)'}
            </span>
          )}
        </span> */}
      </div>

      <div className='list__movies'>
        {sortedMovies &&
          sortedMovies.length > 0 &&
          sortedMovies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
      </div>

      {window.location.pathname !== '/watchlist' &&
        sortedMovies &&
        sortedMovies.length > 0 && (
          <div className='pagination'>
            <Pagination data={sortedMovies} pageLimit={5} dataLimit={20} />
          </div>
        )}
    </div>
  )
}

export default MovieList
