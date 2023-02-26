import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
// import { LazyLoadImage } from 'react-lazy-load-image-component'
// import 'react-lazy-load-image-component/src/effects/blur.css'

// react router dom
import { useNavigate } from 'react-router-dom'

// APIs
import { APIs } from '../../APIs/APIs'

// context
import { useMovieContext } from '../../context/context'

// hooks
import { useWatchlistOperations } from '../../hooks/useWatchlistOperations'
import { useGetClassByVote } from '../../hooks/useGetClassByVote'

// data
import { genreArray } from '../../data/genreData'

// redux
import { useSelector } from 'react-redux'
import { iconsData } from '../../data/icons'

// other
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'
import VideoPlayer from '../../other/VideoPlayer/VideoPlayer'

// Circular progress bar
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

// Recat Icons
import { BsCalendar2Date } from 'react-icons/bs'
import { MdOutlineAccessTime } from 'react-icons/md'

const TvInfo = ({
  id,
  data,
  loading,
  error,
  trailerUrl,
  playerLoading,
  playerError
}) => {
  const navigate = useNavigate()

  //context
  const { mode } = useMovieContext()

  // hooks
  const { addMovie, deleteMovie } = useWatchlistOperations()
  const { getClassBg } = useGetClassByVote()

  // states
  const [genres, setGenres] = useState(new Set())
  const [genre_ids, setGenre_ids] = useState(new Set())

  // redux state
  const savedMovies = useSelector(state => state.savedMovies.savedMovies)
  const user = useSelector(state => state.savedMovies.user)

  // Get & store genre__ids
  useEffect(() => {
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

  return (
    <div
      className={
        'info ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
      }
    >
      <div
        className={'info__detail ' + (mode === true ? 'lightBg1' : 'darkBg2')}
      >
        <div className='info__detail__one'>
          <div className='info__detail__one__title-tgline'>
            <span className='title'>{data.name && data.name}</span>
            <span className='tagline'>{data.tagline && data.tagline}</span>
          </div>

          <div className='info__detail__one__date-time'>
            {data.first_air_date && (
              <span className='date'>
                {/* <BsCalendar2Date size={'20px'} style={{ marginRight: '5px' }} /> */}
                {moment(data.first_air_date).format('Do MMM, YYYY')}
              </span>
            )}

            <span className='gap'>-</span>

            {data.runtime && (
              <span className='time'>
                {/* <MdOutlineAccessTime
                  size={'20px'}
                  style={{ marginRight: '5px' }}
                /> */}
                <>
                  {`${Math.floor(data.runtime / 60)}` > 0 &&
                    `${Math.floor(data.runtime / 60)}h`}
                  {` ${data.runtime % 60}`}m
                </>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Image Video */}

      <div className='info__image__video'>
        <div
          className={
            'info__image__video--image ' +
            (mode === true ? 'lightBg2' : 'darkBg1')
          }
        >
          <img
            loading='lazy'
            src={
              data.poster_path === null
                ? APIs.no_image_url
                : APIs.img_path + data.poster_path
            }
            alt={data.title}
          />

          {/* <LazyLoadImage
          //width={'100%'}
          //height={'100%'}
          className='info__image__video--image'
          alt='image'
          effect='blur'
          placeholderSrc={
            data.poster_path === null
              ? APIs.no_image_url
              : APIs.img_path_w342 + data.poster_path
          }
          src={
            data.poster_path === null
              ? APIs.no_image_url
              : APIs.img_path_w342 + data.poster_path
          }
        /> */}
        </div>

        <div
          className={
            'info__image__video__rating ' + getClassBg(data.vote_average)
          }
        >
          <CircularProgressbar
            value={data.vote_average * 10}
            strokeWidth={5}
            styles={buildStyles({
              pathColor: '#fff'
            })}
          />
          <span>{Number(String(data.vote_average).substring(0, 3))}</span>
        </div>

        {user && savedMovies && savedMovies.length === 0 && (
          <p
            className='info__image__video__add__btn'
            onClick={() =>
              addMovie(
                id,
                data.title,
                data.poster_path,
                data.backdrop_path,
                data.release_date,
                data.vote_average,
                genre_ids,
                data.overview
              )
            }
          >
            <span className='info__image__video__add__btn-icon'>
              {iconsData.star}
            </span>
          </p>
        )}

        {/* ADD-BUTTON */}
        {user &&
          savedMovies &&
          savedMovies.length > 0 &&
          savedMovies.every((item, index) => item.id !== Number(id)) && (
            <p
              key={id}
              className='info__image__video__add__btn'
              onClick={() =>
                addMovie(
                  id,
                  data.title,
                  data.poster_path,
                  data.backdrop_path,
                  data.release_date,
                  data.vote_average,
                  genre_ids,
                  data.overview
                )
              }
            >
              <span className='info__image__video__add__btn-icon'>
                {iconsData.star}
              </span>
            </p>
          )}

        {/* DELETE-BUTTON */}
        {user &&
          savedMovies &&
          savedMovies.length > 0 &&
          savedMovies.map((item, index) => {
            if (item.id === Number(id)) {
              return (
                <p
                  key={index}
                  className='info__image__video__delete__btn'
                  onClick={() => deleteMovie(id)}
                  style={{ background: 'gold' }}
                >
                  <span
                    className='info__image__video__delete__btn-icon'
                    style={{ color: '#000' }}
                  >
                    {iconsData.star}
                  </span>
                </p>
              )
            }
          })}

        {/* ADD-BUTTON (without user) */}
        {!user && (
          <p
            className='info__image__video__btn '
            onClick={() => navigate('/login')}
          >
            <span className='info__image__video__btn-icon'>
              {iconsData.star}
            </span>
          </p>
        )}
        <div
          className={
            'info__image__video__player ' +
            (mode === true ? 'lightBg2' : 'darkBg1')
          }
        >
          {playerLoading && <Loading />}
          {playerError && <Error />}
          {!playerLoading && !playerError && (
            <VideoPlayer embedId={trailerUrl && trailerUrl} />
          )}
        </div>
      </div>

      {/* Image Detail */}
      <div className='info__image__detail'>
        <div
          className={
            'info__image__detail--image ' +
            (mode === true ? 'lightBg2' : 'darkBg1')
          }
        >
          <img
            src={
              data.poster_path === null ? url : APIs.img_path + data.poster_path
            }
            alt={data.title}
          />
        </div>

        <div
          className={
            'info__image__detail--image-1 ' +
            (mode === true ? 'lightBg2' : 'darkBg1')
          }
        >
          <img
            src={
              data.backdrop_path === null
                ? APIs.no_image_url
                : APIs.img_path + data.backdrop_path
            }
            alt={data.title}
          />
        </div>

        <div
          className={
            'info__image__detail__rating ' + getClassBg(data.vote_average)
          }
        >
          <CircularProgressbar
            value={data.vote_average * 10}
            strokeWidth={5}
            styles={buildStyles({
              pathColor: '#fff'
            })}
          />
          <span>{Number(String(data.vote_average).substring(0, 3))}</span>
        </div>

        {user && savedMovies && savedMovies.length === 0 && (
          <p
            className='info__image__detail__add__btn'
            onClick={() =>
              addMovie(
                id,
                data.title,
                data.poster_path,
                data.backdrop_path,
                data.release_date,
                data.vote_average,
                genre_ids,
                data.overview
              )
            }
          >
            <span className='info__image__detail__add__btn-icon'>
              {iconsData.star}
            </span>
          </p>
        )}

        {/* ADD-BUTTON */}
        {user &&
          savedMovies &&
          savedMovies.length > 0 &&
          savedMovies.every((item, index) => item.id !== Number(id)) && (
            <p
              key={id}
              className='info__image__detail__add__btn'
              onClick={() =>
                addMovie(
                  id,
                  data.title,
                  data.poster_path,
                  data.backdrop_path,
                  data.release_date,
                  data.vote_average,
                  genre_ids,
                  data.overview
                )
              }
            >
              <span className='info__image__detail__add__btn-icon'>
                {iconsData.star}
              </span>
            </p>
          )}

        {/* DELETE-BUTTON */}
        {user &&
          savedMovies &&
          savedMovies.length > 0 &&
          savedMovies.map((item, index) => {
            if (item.id === Number(id)) {
              return (
                <p
                  key={index}
                  className='info__image__detail__delete__btn'
                  onClick={() => deleteMovie(id)}
                  style={{ background: 'gold' }}
                >
                  <span
                    className='info__image__detail__delete__btn-icon'
                    style={{ color: '#000' }}
                  >
                    {iconsData.star}
                  </span>
                </p>
              )
            }
          })}

        {/* ADD-BUTTON (without user) */}
        {!user && (
          <p
            className='info__image__detail__btn '
            onClick={() => navigate('/login')}
          >
            <span className='info__image__detail__btn-icon'>
              {iconsData.star}
            </span>
          </p>
        )}

        <div className='info__image__detail__inner'>
          <div className='info__image__detail__inner__genres'>
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

          <div className='info__image__detail__inner__overview'>
            <span>{data.overview && data.overview}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TvInfo
