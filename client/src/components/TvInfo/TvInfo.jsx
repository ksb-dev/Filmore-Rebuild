import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/black-and-white.css'

// react router dom
import { useNavigate } from 'react-router-dom'

// APIs
import { APIs } from '../../APIs/APIs'

// context
import { useMovieContext } from '../../context/context'

// hooks
import { useWatchlistOperations } from '../../hooks/useWatchlistOperations'
import { useGetClassByVote } from '../../hooks/useGetClassByVote'
import { useShowHide } from '../../hooks/useShowHide'
import { useGetTvInfo } from '../../hooks/useGetTvInfo'

// data
import { genreArray } from '../../data/genreData'

// redux
import { useSelector } from 'react-redux'
import { iconsData } from '../../data/icons'

// other
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'
import CircularProgressBar from '../../other/CircularProgressBar/CircularProgressBar'

const TvInfo = ({
  id,
  data,
  loading,
  error,
  trailerUrl,
  trailerLoading,
  trailerError,
  playerRef,
  playerInnerRef,
  setPlayerUrl,
  setPlayerLoading,
  setPlayerError
}) => {
  const navigate = useNavigate()

  //context
  const { mode } = useMovieContext()

  // hooks
  const { addShow, deleteShow } = useWatchlistOperations()
  const { getClassBg } = useGetClassByVote()
  const { showPlayer } = useShowHide()
  const { getTvTrailer786px } = useGetTvInfo()

  // states
  const [genres, setGenres] = useState(new Set())
  const [genre_ids, setGenre_ids] = useState(new Set())

  // redux state
  const savedShows = useSelector(state => state.savedShows.savedShows)
  const user = useSelector(state => state.savedShows.user)

  // Get & store genre__ids
  useEffect(() => {
    setGenres(new Set())

    if (data && data.genres) {
      for (let i = 0; i < data.genres.length; i++) {
        setGenre_ids(prevId => new Set([...prevId, data.genres[i].id]))
      }

      for (let i = 0; i < data.genres.length; i++) {
        for (let j = 0; j < genreArray.length; j++) {
          if (data.genres[i].name === genreArray[j].genre) {
            setGenres(prevGenre => new Set([...prevGenre, genreArray[j]]))
          }
        }
      }
    }
  }, [data])

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
        <Error msg={'Failed to fetch movie information'} />
      </div>
    )
  }

  const {
    name,
    tagline,
    vote_average,
    poster_path,
    backdrop_path,
    first_air_date,
    overview
  } = data

  const playTrailer = () => {
    showPlayer(playerRef, playerInnerRef)
    getTvTrailer786px(id, setPlayerUrl, setPlayerLoading, setPlayerError)
  }

  const handleAddTv = () => {
    addShow(
      id,
      name,
      poster_path,
      backdrop_path,
      first_air_date,
      vote_average,
      genre_ids,
      overview
    )
  }

  const handleDeeleteTv = () => {
    deleteShow(id)
  }

  return (
    <div
      className={
        'tv__info ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
      }
      style={{
        backgroundImage: `url(${APIs.img_path + backdrop_path})`,
        backgroundRepeat: 'no-repeat',
        objectFit: 'fill'
      }}
    >
      <div
        className={
          'cover ' + (mode === true ? 'lightGradient' : 'darkGradient')
        }
      >
        {/* ---------- Image Detail ---------- */}
        <div className='image-detail'>
          <div className='title-tagline-date-time'>
            <div className='title-tagline'>
              <span className='title'>{name && name}</span>
              <span className='tagline'>{tagline && tagline}</span>
            </div>

            <div className='date-time'>
              {first_air_date && (
                <span className='date'>
                  {moment(first_air_date).format('Do MMM, YYYY')}
                </span>
              )}
            </div>
          </div>
          <div className={'image ' + (mode === true ? 'lightBg2' : 'darkBg1')}>
            <img
              className='img-1'
              src={
                poster_path === null
                  ? APIs.no_image_url
                  : APIs.img_path_w342 + poster_path
              }
              alt={name}
              load='lazy'
            />

            <img
              className='img-2'
              src={
                backdrop_path === null
                  ? APIs.no_image_url
                  : APIs.img_path_w780 + backdrop_path
              }
              alt={name}
              load='lazy'
            />

            <div className={'rating ' + getClassBg(vote_average)}>
              <CircularProgressBar vote_average={vote_average} />
            </div>

            {/* ADD-BUTTON */}
            {user && savedShows && savedShows.length === 0 && (
              <p className='add-btn' onClick={() => handleAddTv()}>
                <span className='add-btn-icon'>{iconsData.addBookmark1}</span>
              </p>
            )}

            {/* ADD-BUTTON */}
            {user &&
              savedShows &&
              savedShows.length > 0 &&
              savedShows.every(item => item.id !== Number(id)) && (
                <p key={id} className='add-btn' onClick={() => handleAddTv()}>
                  <span className='add-btn-icon'>{iconsData.addBookmark1}</span>
                </p>
              )}

            {/* DELETE-BUTTON */}
            {user &&
              savedShows &&
              savedShows.length > 0 &&
              savedShows.map((item, index) => {
                if (item.id === Number(id)) {
                  return (
                    <p
                      key={index}
                      className='delete-btn'
                      onClick={() => handleDeeleteTv()}
                      style={{ background: 'gold' }}
                    >
                      <span
                        className='delete-btn-icon'
                        style={{ color: '#000' }}
                      >
                        {iconsData.addedBookmark1}
                      </span>
                    </p>
                  )
                }
              })}

            {/* ADD-BUTTON (without user) */}
            {!user && (
              <p className='btn ' onClick={() => navigate('/login')}>
                <span className='btn-icon'>{iconsData.addBookmark1}</span>
              </p>
            )}
          </div>

          <div className='detail'>
            <div className='title-tagline'>
              <span className='title'>{name && name}</span>
              <span className='tagline'>{tagline && tagline}</span>
            </div>

            <div className='date-time'>
              {first_air_date && (
                <span className='date'>
                  {moment(first_air_date).format('Do MMM, YYYY')}
                </span>
              )}
            </div>

            <div className='genres'>
              {genres &&
                Array.from(genres).length > 0 &&
                Array.from(genres).map((genre, index) => (
                  <span
                    key={index}
                    className={
                      mode === true ? 'genreDarkBorder' : 'genreLightBorder'
                    }
                  >
                    {genre.genre}
                  </span>
                ))}
            </div>

            <div className='overview'>
              <span>{overview && overview}</span>
            </div>

            <span className='play-btn' onClick={() => playTrailer()}>
              {iconsData.play}
              Watch Trailer
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TvInfo
