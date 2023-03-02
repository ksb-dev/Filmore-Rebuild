import React, { useState, useEffect, useRef } from 'react'

// React Router
import { useParams } from 'react-router-dom'

// Redux
import { useDispatch } from 'react-redux'
import {
  setSavedMovies,
  setMovieUserNull
} from '../../redux/services/movies/setSavedMovies'
import {
  setSavedShows,
  setTvUserNull
} from '../../redux/services/shows/setSavedShows'

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
import Reviews from '../../components/Reviews/Reviews'
import PlayerOne from '../../components/PlayerOne/PlayerOne'
import ImageViewer from '../../components/ImageViewer/ImageViewer'

const MovieDetail = () => {
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

  const {
    getMovieTrailer,
    getMovieInfo,
    getMovieCast,
    getMovieBackdrops,
    getMovieVideos,
    getMovieReviews
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
  const [trailerLoading, setTrailerLoading] = useState(true)
  const [trailerError, setTrailerError] = useState('')

  const [playerUrl, setPlayerUrl] = useState('')
  const [playerLoading, setPlayerLoading] = useState(true)
  const [playerError, setPlayerError] = useState('')
  const playerOneRef = useRef(null)
  const playerOneInnerRef = useRef(null)

  const [type, setType] = useState('movie')

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    const savedToken = sessionStorage.getItem('token')

    if (savedToken !== '' || savedToken !== undefined || savedToken !== null) {
      dispatch(setSavedMovies())
      dispatch(setSavedShows())
    } else {
      dispatch(setMovieUserNull())
      dispatch(setTvUserNull())
    }
  }, [dispatch, movieState])

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    // 1. Get Trailer
    getMovieTrailer(id, setTrailerUrl, setTrailerLoading, setTrailerError)

    // 2. Get info
    getMovieInfo(id, setData, setLoading, setError)

    //3. Get cast
    setTimeout(() => {
      getMovieCast(id, setCast, setCastLoading, setCastError)
    }, 250)

    //4. Get backdrops
    setTimeout(() => {
      getMovieBackdrops(
        id,
        setBackdrops,
        setBackdropsLoading,
        setBackdropsError
      )
    }, 500)

    //5. Get videos
    setTimeout(() => {
      getMovieVideos(id, setVideos, setVideosLoading, setVideosError)
    }, 750)

    //6. Get reviews
    setTimeout(() => {
      getMovieReviews(id, setReviews, setReviewsLoading, setReviewsError)
    }, 1000)
  }, [movieIdState])

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
        trailerLoading={trailerLoading}
        trailerError={trailerError}
        playerRef={playerOneRef}
        playerInnerRef={playerOneInnerRef}
        setPlayerUrl={setPlayerUrl}
        setPlayerLoading={setPlayerLoading}
        setPlayerError={setPlayerError}
      />

      <PlayerOne
        playerRef={playerOneRef}
        playerInnerRef={playerOneInnerRef}
        playerUrl={playerUrl}
        playerLoading={playerLoading}
        setPlayerUrl={setPlayerUrl}
      />

      {!loading && !error && (
        <>
          <CastBackdropsVideo
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
            setPlayerUrl={setPlayerUrl}
            setPlayerLoading={setPlayerLoading}
            setPlayerError={setPlayerError}
            playerRef={playerOneRef}
            playerInnerRef={playerOneInnerRef}
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

export default MovieDetail
