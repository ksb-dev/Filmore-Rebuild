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
    setCastError,
    backdrops,
    setBackdrops,
    backdropsLoading,
    setBackdropsLoading,
    backdropsError,
    setBackdropsError,
    videos,
    setVideos,
    videosLoading,
    setVideosLoading,
    videosError,
    setVideosError,
    trailerUrl,
    setTrailerUrl,
    trailerLoading,
    setTrailerLoading,
    trailerError,
    setTrailerError,
    playerUrl,
    setPlayerUrl,
    playerLoading,
    setPlayerLoading,
    playerError,
    setPlayerError,
    reviews,
    setReviews,
    reviewsLoading,
    setReviewsLoading,
    reviewsError,
    setReviewsError
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
  }, [id])

  return (
    <div className={'movie-detail ' + (mode === true ? 'lightBg1' : 'darkBg2')}>
      <Header />
      <SmallHeader />
      <Menu />
      <SearchModal />

      <MovieInfo id={id} type={type} />

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
            id={id}
            type={type}
            cast={cast}
            castError={castError}
            castLoading={castLoading}
            backdrops={backdrops}
            backdropsLoading={backdropsLoading}
            backdropsError={backdropsError}
            videos={videos}
            videosLoading={videosLoading}
            videosError={videosError}
            setPlayerUrl={setPlayerUrl}
            setPlayerLoading={setPlayerLoading}
            setPlayerError={setPlayerError}
            playerRef={playerOneRef}
            playerInnerRef={playerOneInnerRef}
          />

          <Reviews type={type} id={id} />

          <ImageViewer />
        </>
      )}
    </div>
  )
}

export default MovieDetail
