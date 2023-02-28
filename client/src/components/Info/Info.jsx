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
import { FaPlay } from 'react-icons/fa'

const MovieInfo = ({
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

  const {
    poster_path,
    backdrop_path,
    title,
    tagline,
    vote_average,
    overview,
    release_date,
    runtime
  } = data

  return (
    <>
      <div
        className={
          'info ' +
          (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
        }
        style={{
          backgroundImage: `url(${
            data && data.backdrop_path === null
              ? APIs.no_image_url
              : APIs.img_path + data.backdrop_path
          })`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <div
          className={
            'info__container ' +
            (mode === true ? 'lightCoverGradient' : 'darkCoverGradient')
          }
        >
          <div className='info__container__one'>
            <div
              className={
                'info__container__one--image ' +
                (mode === true ? 'lightBg2' : 'darkBg1')
              }
            >
              <img
                className='image-1'
                loading='lazy'
                src={
                  poster_path === null
                    ? APIs.no_image_url
                    : APIs.img_path + poster_path
                }
                alt={title}
              />

              {user && savedMovies && savedMovies.length === 0 && (
                <p
                  className='info__container__one--image--add__btn'
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
                  <span className='info__container__one--image--add__btn--icon'>
                    {iconsData.star}
                  </span>
                </p>
              )}

              {user &&
                savedMovies &&
                savedMovies.length > 0 &&
                savedMovies.every((item, index) => item.id !== Number(id)) && (
                  <p
                    key={id}
                    className='info__container__one--image--add__btn'
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
                    <span className='info__container__one--image--add__btn--icon'>
                      {iconsData.star}
                    </span>
                  </p>
                )}

              {user &&
                savedMovies &&
                savedMovies.length > 0 &&
                savedMovies.map((item, index) => {
                  if (item.id === Number(id)) {
                    return (
                      <p
                        key={index}
                        className='info__container__one--image--delete__btn'
                        onClick={() => deleteMovie(id)}
                        style={{ background: 'gold' }}
                      >
                        <span
                          className='info__container__one--image--delete__btn--icon'
                          style={{ color: '#000' }}
                        >
                          {iconsData.star}
                        </span>
                      </p>
                    )
                  }
                })}

              {!user && (
                <p
                  className='info__container__one--image--btn '
                  onClick={() => navigate('/login')}
                >
                  <span className='info__container__one--image--btn--icon'>
                    {iconsData.star}
                  </span>
                </p>
              )}

              <div
                className={
                  'info__container__one--image__rating ' +
                  getClassBg(vote_average)
                }
              >
                <CircularProgressbar
                  value={vote_average * 10}
                  strokeWidth={5}
                  styles={buildStyles({
                    pathColor: '#fff'
                  })}
                />
                <span>{Number(String(vote_average).substring(0, 3))}</span>
              </div>

              <img
                className='image-2'
                loading='lazy'
                src={
                  poster_path === null
                    ? APIs.no_image_url
                    : APIs.img_path + backdrop_path
                }
                alt={title}
              />

              {user && savedMovies && savedMovies.length === 0 && (
                <p
                  className='info__container__one--image--add__btn'
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
                  <span className='info__container__one--image--add__btn--icon'>
                    {iconsData.star}
                  </span>
                </p>
              )}

              {user &&
                savedMovies &&
                savedMovies.length > 0 &&
                savedMovies.every((item, index) => item.id !== Number(id)) && (
                  <p
                    key={id}
                    className='info__container__one--image--add__btn'
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
                    <span className='info__container__one--image--add__btn--icon'>
                      {iconsData.star}
                    </span>
                  </p>
                )}

              {user &&
                savedMovies &&
                savedMovies.length > 0 &&
                savedMovies.map((item, index) => {
                  if (item.id === Number(id)) {
                    return (
                      <p
                        key={index}
                        className='info__container__one--image--delete__btn'
                        onClick={() => deleteMovie(id)}
                        style={{ background: 'gold' }}
                      >
                        <span
                          className='info__container__one--image--delete__btn--icon'
                          style={{ color: '#000' }}
                        >
                          {iconsData.star}
                        </span>
                      </p>
                    )
                  }
                })}

              {!user && (
                <p
                  className='info__container__one--image--btn '
                  onClick={() => navigate('/login')}
                >
                  <span className='info__container__one--image--btn--icon'>
                    {iconsData.star}
                  </span>
                </p>
              )}

              <div
                className={
                  'info__container__one--image__rating ' +
                  getClassBg(vote_average)
                }
              >
                <CircularProgressbar
                  value={vote_average * 10}
                  strokeWidth={5}
                  styles={buildStyles({
                    pathColor: '#fff'
                  })}
                />
                <span>{Number(String(vote_average).substring(0, 3))}</span>
              </div>
            </div>
          </div>

          <div className='info__container__two'>
            <div className='info__container__two__title-tagline'>
              <span className='title'>{title && title}</span>
              <span className='tagline'>{tagline && tagline}</span>
            </div>

            <div className='info__container__two__date-time'>
              <span className='date'>
                {release_date && moment(release_date).format('Do MMM, YYYY')}
              </span>

              <span className='gap'>-</span>

              <span className='time'>
                {`${Math.floor(runtime / 60)}` > 0 &&
                  `${Math.floor(runtime / 60)}h`}
                {` ${runtime % 60}`}m
              </span>
            </div>

            <div className='info__container__two__genres'>
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

            <div className='info__container__two__overview'>
              <span>{overview && overview}</span>
            </div>

            <div
              className={'playBtn ' + (mode === true ? 'lightBg2' : 'darkBg1')}
            >
              <span className={mode === true ? 'darkColor1' : 'lightColor1'}>
                <FaPlay size={'20px'} style={{ marginRight: '0.5rem' }} /> Play
                Trailer
              </span>
            </div>
          </div>
        </div>

        {/* <div
        className={'info__detail ' + (mode === true ? 'lightBg1' : 'darkBg2')}
      >
        <div className='info__detail__one'>
          <div className='info__detail__one__title-tgline'>
            <span className='title'>
              {(data.title && data.title) || (data.name && data.name)}
            </span>
            <span className='tagline'>{data.tagline && data.tagline}</span>
          </div>

          <div className='info__detail__one__date-time'>
            {data.release_date && (
              <span className='date'>
                {moment(data.release_date).format('Do MMM, YYYY')}
              </span>
            )}

            {data.first_air_date && (
              <span className='date'>
                {moment(data.first_air_date).format('Do MMM, YYYY')}
              </span>
            )}

            <span className='gap'>-</span>

            {data.runtime && (
              <span className='time'>
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
              data.poster_path === null ? url : APIs.img_path + data.poster_path
            }
            alt={data.title}
          />
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
          {!playerLoading && !playerError && trailerUrl !== '' && (
            <VideoPlayer embedId={trailerUrl && trailerUrl} />
          )}
          {trailerUrl === '' && <span>No video found.</span>}
        </div>
      </div>

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

            <span
              className={
                'text ' +
                (mode === true ? 'lightBg2 darkColor1' : 'darkBg1 lightColor1')
              }
            >
              Add to Watchlist
            </span>
          </p>
        )}

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
              <span
                className={
                  'text ' +
                  (mode === true
                    ? 'lightBg2 darkColor1'
                    : 'darkBg1 lightColor1')
                }
              >
                Add to Watchlist
              </span>
            </p>
          )}


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

                  <span className='text' style={{ color: '#000' }}>
                    Delete Watchlist
                  </span>
                </p>
              )
            }
          })}

        {!user && (
          <p
            className='info__image__detail__btn '
            onClick={() => navigate('/login')}
          >
            <span className='info__image__detail__btn-icon'>
              {iconsData.star}
            </span>
            <span
              className={
                'text ' +
                (mode === true ? 'lightBg2 darkColor1' : 'darkBg1 lightColor1')
              }
            >
              Login to Add
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
      </div> */}
      </div>
    </>
  )
}

export default MovieInfo
