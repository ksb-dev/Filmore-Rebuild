import React from 'react'

// APIs
import { APIs } from '../../APIs/APIs'

// context
import { useMovieContext } from '../../context/context'

// components
import ActorCard from '../../components/ActorCard/ActorCard'

// other
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'

// data
import { iconsData } from '../../data/icons'

const FullCast = () => {
  const { mode, data, loading, error, cast, castLoading, castError } =
    useMovieContext()

  if (loading) {
    return (
      <div className='loading'>
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className='error'>
        <Error msg={'Failed to fetch cast'} />
      </div>
    )
  }

  return (
    <>
      {!loading && !error && (
        <div className='full__cast'>
          <div className='full__cast__detail'>
            <span className='full__cast__detail--title'>{data.title}</span>

            <span className='full__cast__detail--tagline'>{data.tagline}</span>

            <div className='full__cast__detail--image'>
              {data.backdrop_path === null ? (
                <span
                  className={
                    'img-icon ' + (mode === true ? 'lightBg2' : 'darkBg1')
                  }
                >
                  {iconsData.imageIcon}
                </span>
              ) : (
                <img
                  className='img'
                  src={APIs.img_path_w780 + data.backdrop_path}
                  alt={data.title}
                  load='lazy'
                />
              )}

              <div
                className={
                  'cover ' +
                  (mode === true ? 'lightGradient2' : 'darkGradient2')
                }
              ></div>
            </div>
          </div>

          <div className='full__cast__container'>
            <div className='full__cast__container--title'>
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

            <div className='full__cast__container__inner'>
              {cast &&
                cast.map((actor, index) => (
                  <ActorCard key={index} actor={actor} />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FullCast
