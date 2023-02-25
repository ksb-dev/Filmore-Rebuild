import React, { useState, useEffect, useRef } from 'react'

// React Router
import { useParams } from 'react-router-dom'

// Redux
import { useDispatch } from 'react-redux'
import { setSavedMovies } from '../../redux/services/movies/setSavedMovies'

// Context
import { useMovieContext } from '../../context/context'

// Hooks
import { useGetMovieInfo } from '../../hooks/useGetMovieInfo'

// Components
import Header from '../../components/Header/Header'
import SmallHeader from '../../components/Header/SmallHeader/SmallHeader'
import Menu from '../../components/Menu/Menu'
import SearchModal from '../../components/SearchModal/SearchModal'

import MovieInfo from '../../components/MovieInfo/MovieInfo'
import CastBackdropsVideo from '../../components/CastBackdropsVideo/CastBackdropsVideo'
//import YouTubePlayer from '../../Components/MovieDetail/YoutubePlayer/YouTubePlayer'
//import CastBackdropVideo from '../../Components/CastBackdropVideo/CastBackdropVideo'
//import Reviews from '../../Components/Reviews/Reviews'
//import ImageViewer from '../../Components/ImageViewer/ImageViewer'

// Sub-Components
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'

const MovieDetail = () => {
  const { mode, movieState } = useMovieContext()
  const dispatch = useDispatch()

  const {
    getTrailer,
    getMovieInfo,
    getCast,
    getBackdrops,
    getVideos,
    getReviews
  } = useGetMovieInfo()

  // Movie info
  const { id } = useParams()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Cast
  const [cast, setCast] = useState([])
  const [castLoading, setCastLoading] = useState(true)
  const [castError, setCastError] = useState('')

  // Backdrop
  const [backdrops, setBackdrops] = useState([])
  const [backdropsLoading, setBackdropsLoading] = useState(true)
  const [backdropsError, setBackdropsError] = useState('')

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
    // 1. Get movie info
    getMovieInfo(id, setData, setLoading, setError)

    // 2. Get Trailer
    getTrailer(id, trailerUrl, setTrailerUrl, setPlayerLoading, setPlayerError)

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
  }, [])

  return (
    <div className={'movie-detail ' + (mode === true ? 'lightBg1' : 'darkBg2')}>
      <Header />
      <SmallHeader />
      <Menu />
      <SearchModal />

      <MovieInfo
        id={id}
        data={data}
        loading={loading}
        error={error}
        trailerUrl={trailerUrl}
        playerLoading={playerLoading}
        playerError={playerError}
      />

      {!loading && !error && (
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
      )}

      {/* <MovieDetail
        data={data}
        loading={loading}
        error={error}
        playerRef={playerRef}
        playerInnerRef={playerInnerRef}
        id={id}
        trailerUrl={trailerUrl}
        setTrailerUrl={setTrailerUrl}
        setPlayerLoading={setPlayerLoading}
        setPlayerError={setPlayerError}
      />

      <YouTubePlayer
        playerRef={playerRef}
        playerInnerRef={playerInnerRef}
        trailerUrl={trailerUrl}
        setTrailerUrl={setTrailerUrl}
        playerLoading={playerLoading}
        playerError={playerError}
      /> */}

      {!loading && !error && (
        <>
          {/* <CastBackdropVideo
            id={id}
            cast={cast}
            castError={castError}
            castLoading={castLoading}
            setCast={setCast}
            setCastLoading={setCastLoading}
            setCastError={setCastError}
            reviews={reviews}
            reviewsError={reviewsError}
            reviewsLoading={reviewsLoading}
          />

          <Reviews
            id={id}
            reviews={reviews}
            reviewsError={reviewsError}
            reviewsLoading={reviewsLoading}
          />

          <ImageViewer /> */}
        </>
      )}
      {/* <Login />
      <Register /> */}
    </div>
  )
}

export default MovieDetail
