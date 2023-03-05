import React, { useEffect } from 'react'

// react router dom
import { useParams } from 'react-router-dom'

// hooks
import { useGetMovieInfo } from '../../hooks/useGetMovieInfo'

// APIs
import { APIs } from '../../APIs/APIs'

// context
import { useMovieContext } from '../../context/context'

// components
import Header from '../../components/Header/Header'
import SmallHeader from '../../components/Header/SmallHeader/SmallHeader'
import Menu from '../../components/Menu/Menu'
import SearchModal from '../../components/SearchModal/SearchModal'
import ActorCard from '../../components/ActorCard/ActorCard'

// other
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'

const MovieCast = () => {
  const { id } = useParams()
  const {
    mode,
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    cast,
    setCast,
    castLoading,
    setCastLoading,
    castError,
    setCastError
  } = useMovieContext()
  const { getMovieInfo, getMovieCast } = useGetMovieInfo()

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    getMovieInfo(id, setData, setLoading, setError)

    getMovieCast(id, setCast, setCastLoading, setCastError)
  }, [])

  return (
    <div
      className={
        'movie__cast ' +
        (mode === true ? 'lightBg1 darColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
      <SmallHeader />
      <Menu />
      <SearchModal />

      {loading && (
        <div className='loading'>
          <Loading />
        </div>
      )}

      {error && (
        <div className='error'>
          <Error msg={'Failed to fetch cast'} />
        </div>
      )}

      {!loading && !error && (
        <div className='movie__cast__inner'>
          <div className='movie__cast__inner__detail'>
            <span className='movie__cast__inner__detail--title'>
              {data.original_title}
            </span>

            <span className='movie__cast__inner__detail--tagline'>
              {data.tagline}
            </span>

            <div className='movie__cast__inner__detail--image'>
              <img
                className='img'
                src={
                  data.backdrop_path === null
                    ? APIs.no_image_url
                    : APIs.img_path + data.backdrop_path
                }
                alt={data.title}
                load='lazy'
              />
            </div>
          </div>

          <div className='movie__cast__inner__full'>
            <div className='movie__cast__inner__full--title'>
              <span className='title'>Full Cast</span>
              <p className='length'>
                <span>{cast && cast.length}</span>
              </p>
            </div>

            {castLoading && (
              <span className='cast-loading'>
                <Loading />
              </span>
            )}

            {castError && (
              <span className='cast-loading'>
                <Error msg={'No cast found.'} />
              </span>
            )}

            <div className='movie__cast__inner__full__cast'>
              {cast &&
                cast.map((actor, index) => (
                  <ActorCard key={index} actor={actor} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieCast
