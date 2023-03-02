import React, { useState, useEffect, useRef } from 'react'

// React Router
import { useParams } from 'react-router-dom'

// Redux
import { useDispatch } from 'react-redux'
import { setSavedMovies } from '../../redux/services/movies/setSavedMovies'

// Context
import { useMovieContext } from '../../context/context'

// Hooks
import { useGetTvInfo } from '../../hooks/useGetTvInfo'

// Components
import Header from '../../components/Header/Header'
import SmallHeader from '../../components/Header/SmallHeader/SmallHeader'
import Menu from '../../components/Menu/Menu'
import SearchModal from '../../components/SearchModal/SearchModal'

import TvInfo from '../../components/TvInfo/TvInfo'
import CastBackdropsVideo from '../../components/CastBackdropsVideo/CastBackdropsVideo'
import Reviews from '../../components/Reviews/Reviews'
import Player from '../../components/Player/Player'
import ImageViewer from '../../components/ImageViewer/ImageViewer'

const TvDetail = () => {
  const {
    mode,
    movieState,
    movieIdState,
    backdrops,
    setBackdrops,
    backdropsLoading,
    setBackdropsLoading,
    backdropsError,
    setBackdropsError
  } = useMovieContext()
  const dispatch = useDispatch()

  const { getTrailer, getInfo, getCast, getBackdrops, getVideos, getReviews } =
    useGetTvInfo()

  // Movie info
  const { id } = useParams()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Cast
  const [cast, setCast] = useState([])
  const [castLoading, setCastLoading] = useState(true)
  const [castError, setCastError] = useState('')

  // Videos
  const [videos, setVideos] = useState([])
  const [videosLoading, setVideosLoading] = useState(true)
  const [videosError, setVideosError] = useState('')

  // Reviews
  const [reviews, setReviews] = useState([])
  const [reviewsLoading, setReviewsLoading] = useState(true)
  const [reviewsError, setReviewsError] = useState('')

  // Youtube
  const [trailerUrl, setTrailerUrl] = useState('')
  const [playerLoading, setPlayerLoading] = useState(true)
  const [playerError, setPlayerError] = useState('')
  const playerRef = useRef(null)
  const playerInnerRef = useRef(null)

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    const savedToken = sessionStorage.getItem('token')

    if (savedToken !== '' || savedToken !== undefined || savedToken !== null) {
      dispatch(setSavedMovies())
    }
  }, [dispatch, movieState])

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    // 1. Get Trailer
    getTrailer(id, setTrailerUrl, setPlayerLoading, setPlayerError)

    // 2. Get info
    getInfo(id, setData, setLoading, setError)

    //3. Get cast
    setTimeout(() => {
      getCast(id, setCast, setCastLoading, setCastError)
    }, 250)

    //4. Get backdrops
    setTimeout(() => {
      getBackdrops(id, setBackdrops, setBackdropsLoading, setBackdropsError)
    }, 500)

    //5. Get videos
    setTimeout(() => {
      getVideos(id, setVideos, setVideosLoading, setVideosError)
    }, 750)

    //6. Get reviews
    setTimeout(() => {
      getReviews(id, setReviews, setReviewsLoading, setReviewsError)
    }, 1000)
  }, [movieIdState])

  return (
    <div className={'tv-detail ' + (mode === true ? 'lightBg1' : 'darkBg2')}>
      <Header />
      <SmallHeader />
      <Menu />
      <SearchModal />

      <TvInfo
        id={id}
        data={data}
        loading={loading}
        error={error}
        playerRef={playerRef}
        playerInnerRef={playerInnerRef}
        trailerUrl={trailerUrl}
        setTrailerUrl={setTrailerUrl}
        playerLoading={playerLoading}
        setPlayerLoading={setPlayerLoading}
        playerError={playerError}
        setPlayerError={setPlayerError}
      />

      <Player
        playerRef={playerRef}
        playerInnerRef={playerInnerRef}
        trailerUrl={trailerUrl}
        setTrailerUrl={setTrailerUrl}
        playerLoading={playerLoading}
        playerError={playerError}
      />

      {!loading && !error && (
        <>
          <CastBackdropsVideo
            id={id}
            cast={cast}
            castError={castError}
            castLoading={castLoading}
            backdrops={backdrops}
            backdropsLoading={backdropsLoading}
            backdropsError={backdropsError}
            videos={videos}
            videosLoading={videosLoading}
            videosError={videosError}
            reviews={reviews}
            reviewsError={reviewsError}
            reviewsLoading={reviewsLoading}
          />

          <Reviews
            reviews={reviews}
            reviewsLoading={reviewsLoading}
            reviewsError={reviewsError}
          />

          <ImageViewer />
        </>
      )}
    </div>
  )
}

export default TvDetail
