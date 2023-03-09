import React from 'react'

// APIs
import { APIs } from '../../APIs/APIs'

// context
import { useMovieContext } from '../../context/context'

// components
import VideoCard from '../../components/VideoCard/VideoCard'

// other
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'

// data
import { iconsData } from '../../data/icons'

const AllVideos = ({ playerRef, playerInnerRef }) => {
  const {
    mode,
    data,
    loading,
    error,
    videos,
    videosLoading,
    videosError,
    setPlayerUrl,
    setPlayerLoading
  } = useMovieContext()

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
        <Error msg={'Failed to fetch videos'} />
      </div>
    )
  }

  return (
    <>
      {!loading && !error && (
        <div className='all__videos'>
          <div className='all__videos__detail'>
            <span className='all__videos__detail--title'>{data.title}</span>

            <span className='all__videos__detail--tagline'>{data.tagline}</span>

            <div className='all__videos__detail--image'>
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

          <div className='all__videos__container'>
            <div className='all__videos__container--title'>
              <span className='title'>All Videos</span>
              <p className='length'>
                <span>{videos && videos.length}</span>
              </p>
            </div>

            {videosLoading && (
              <span className='videos-loading'>
                <Loading />
              </span>
            )}

            {videosError && (
              <span className='videos-loading'>
                <Error msg={'No videos found.'} />
              </span>
            )}

            <div className='all__videos__container__videos'>
              {videos &&
                videos.map((video, index) => (
                  <VideoCard
                    key={index}
                    video={video}
                    setPlayerUrl={setPlayerUrl}
                    setPlayerLoading={setPlayerLoading}
                    playerRef={playerRef}
                    playerInnerRef={playerInnerRef}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AllVideos
