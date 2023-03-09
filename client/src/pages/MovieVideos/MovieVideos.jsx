import React, { useEffect, useRef } from 'react'

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
import VideoCard from '../../components/VideoCard/VideoCard'
import PlayerOne from '../../components/PlayerOne/PlayerOne'

// other
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'

// data
import { iconsData } from '../../data/icons'

const MovieVideos = () => {
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
  const { getMovieInfo, getMovieVideos } = useGetMovieInfo()

  const playerThreeRef = useRef(null)
  const playerThreeInnerRef = useRef(null)

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    getMovieInfo(id, setData, setLoading, setError)

    getMovieVideos(id, setVideos, setVideosLoading, setVideosError)
  }, [])

  return (
    <div
      className={
        'movie__videos ' +
        (mode === true ? 'lightBg1 darColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
      <SmallHeader />
      <Menu />
      <SearchModal />

      <PlayerOne
        playerRef={playerThreeRef}
        playerInnerRef={playerThreeInnerRef}
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
        <div className='movie__videos__inner'>
          <div className='movie__videos__inner__detail'>
            <span className='movie__videos__inner__detail--title'>
              {data.title}
            </span>

            <span className='movie__videos__inner__detail--tagline'>
              {data.tagline}
            </span>

            <div className='movie__videos__inner__detail--image'>
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

          <div className='movie__videos__inner__full'>
            <div className='movie__videos__inner__full--title'>
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

            <div className='movie__videos__inner__full__videos'>
              {videos &&
                videos.map((video, index) => (
                  <VideoCard
                    key={index}
                    video={video}
                    setPlayerUrl={setPlayerUrl}
                    setPlayerLoading={setPlayerLoading}
                    playerRef={playerThreeRef}
                    playerInnerRef={playerThreeInnerRef}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieVideos
