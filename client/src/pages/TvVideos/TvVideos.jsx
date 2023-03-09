import React, { useEffect, useRef } from 'react'

// react router dom
import { useParams } from 'react-router-dom'

// hooks
import { useGetTvInfo } from '../../hooks/useGetTvInfo'

// APIs
import { APIs } from '../../APIs/APIs'

// context
import { useMovieContext } from '../../context/context'

// components
import Header from '../../components/Header/Header'
import SmallHeader from '../../components/Header/SmallHeader/SmallHeader'
import Menu from '../../components/Menu/Menu'
import SearchModal from '../../components/SearchModal/SearchModal'
import VideoCard from '../../components/VideoCard/VideoCard'
import PlayerOne from '../../components/PlayerOne/PlayerOne'

// other
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'

// data
import { iconsData } from '../../data/icons'

const TvVideos = () => {
  const { id } = useParams()
  const {
    mode,
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    videos,
    setVideos,
    videosLoading,
    setVideosLoading,
    videosError,
    setVideosError,
    playerUrl,
    setPlayerUrl,
    playerLoading,
    setPlayerLoading
  } = useMovieContext()
  const { getTvInfo, getTvVideos } = useGetTvInfo()

  const playerFourRef = useRef(null)
  const playerFourInnerRef = useRef(null)

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    getTvInfo(id, setData, setLoading, setError)

    getTvVideos(id, setVideos, setVideosLoading, setVideosError)
  }, [])

  return (
    <div
      className={
        'tv__videos ' +
        (mode === true ? 'lightBg1 darColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
      <SmallHeader />
      <Menu />
      <SearchModal />

      <PlayerOne
        playerRef={playerFourRef}
        playerInnerRef={playerFourInnerRef}
        playerUrl={playerUrl}
        playerLoading={playerLoading}
        setPlayerUrl={setPlayerUrl}
      />

      {loading && (
        <div className='loading'>
          <Loading />
        </div>
      )}

      {error && (
        <div className='error'>
          <Error msg={'Failed to fetch videos'} />
        </div>
      )}

      {!loading && !error && (
        <div className='tv__videos__inner'>
          <div className='tv__videos__inner__detail'>
            <span className='tv__videos__inner__detail--title'>
              {data.original_title}
            </span>

            <span className='tv__videos__inner__detail--tagline'>
              {data.tagline}
            </span>

            <div className='tv__videos__inner__detail--image'>
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
                  alt={data.name}
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

          <div className='tv__videos__inner__full'>
            <div className='tv__videos__inner__full--title'>
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

            <div className='tv__videos__inner__full__videos'>
              {videos &&
                videos.map((video, index) => (
                  <VideoCard
                    key={index}
                    video={video}
                    setPlayerUrl={setPlayerUrl}
                    setPlayerLoading={setPlayerLoading}
                    playerRef={playerFourRef}
                    playerInnerRef={playerFourInnerRef}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TvVideos
