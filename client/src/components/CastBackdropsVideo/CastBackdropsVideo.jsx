import React from 'react'

// data
import { iconsData } from '../../data/icons'

// context
import { useMovieContext } from '../../context/context'

// components
import Cast from './Cast/Cast'
import Backdrops from './Backdrops/Backdrops'
import Videos from './Videos/Videos'

const CastBackdropsVideo = ({
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

  return (
    <div
      className={
        'castBackdropVideo ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
      }
    >
      <div className='castBackdropVideo__cast'>
        <div className='castBackdropVideo__cast__title'>
          Top Cast
          <p className='length'>
            <span>{cast && cast.length}</span>
          </p>
          <span className='icon'>{iconsData.forwardArrow}</span>
        </div>
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
