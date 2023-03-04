import React from 'react'

// react router dom
import { Link } from 'react-router-dom'

// data
import { iconsData } from '../../data/icons'

// context
import { useMovieContext } from '../../context/context'

// components
import Cast from './Cast/Cast'
import Backdrops from './Backdrops/Backdrops'
import Videos from './Videos/Videos'

const CastBackdropsVideo = ({
  id,
  type,
  cast,
  castLoading,
  castError,
  backdrops,
  backdropsLoading,
  backdropsError,
  videos,
  videosLoading,
  videosError,
  setPlayerUrl,
  setPlayerLoading,
  setPlayerError,
  playerRef,
  playerInnerRef
}) => {
  const { mode } = useMovieContext()

  let path = type === 'movie' ? `/movie/cast/${id}` : `/tv/cast/${id}`

  return (
    <div
      className={
        'castBackdropVideo ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
      }
    >
      <div className='castBackdropVideo__cast'>
        <Link
          to={path}
          className={
            'castBackdropVideo__cast__title ' +
            (mode === true ? 'darkColor1' : 'lightColor1')
          }
        >
          Top Cast
          <p className='length'>
            <span>{cast && cast.length}</span>
          </p>
          <span className='icon'>{iconsData.forwardArrow}</span>
        </Link>
        <Cast cast={cast} castLoading={castLoading} castError={castError} />
      </div>

      <div className='castBackdropVideo__backdrops'>
        <div className='castBackdropVideo__backdrops__title'>
          Backdrops
          <p className='length'>
            <span>{backdrops && backdrops.length}</span>
          </p>
          <span className='icon'>{iconsData.forwardArrow}</span>
        </div>
        <Backdrops
          backdrops={backdrops}
          backdropsLoading={backdropsLoading}
          backdropsError={backdropsError}
        />
      </div>

      <div className='castBackdropVideo__videos'>
        <div className='castBackdropVideo__videos__title'>
          Videos
          <p className='length'>
            <span>{videos && videos.length}</span>
          </p>
          <span className='icon'>{iconsData.forwardArrow}</span>
        </div>
        <Videos
          videos={videos}
          videosLoading={videosLoading}
          videosError={videosError}
          setPlayerUrl={setPlayerUrl}
          setPlayerLoading={setPlayerLoading}
          setPlayerError={setPlayerError}
          playerRef={playerRef}
          playerInnerRef={playerInnerRef}
        />
      </div>
    </div>
  )
}

export default CastBackdropsVideo
