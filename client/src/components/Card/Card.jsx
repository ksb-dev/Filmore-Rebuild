import React, { useRef } from 'react'
import moment from 'moment'

// data
import { iconsData } from '../../data/icons'

// Hooks
import { useWatchlistOperations } from '../../hooks/useWatchlistOperations'
import { useGetClassByVote } from '../../hooks/useGetClassByVote'
import { useGetMovieInfo } from '../../hooks/useGetMovieInfo'
import { useGetTvInfo } from '../../hooks/useGetTvInfo'
import { useShowHide } from '../../hooks/useShowHide'

// Redux
import { useSelector } from 'react-redux'

// Recat Router
import { Link, useNavigate } from 'react-router-dom'

// Context
import { useMovieContext } from '../../context/context'

// APIs
import { APIs } from '../../APIs/APIs'

// Circular progress bar
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

const Card = ({ card, type, user, playerRef, playerInnerRef }) => {
  const { mode, setPlayerUrl, setPlayerLoading, setPlayerError } =
    useMovieContext()
  const { addMovie, deleteMovie, addShow, deleteShow } =
    useWatchlistOperations()
  const { getClassBg } = useGetClassByVote()
  const { getMovieTrailer786px } = useGetMovieInfo()
  const { getTvTrailer786px } = useGetTvInfo()
  const { showPlayer } = useShowHide()

  const navigate = useNavigate()

  const infoRef = useRef(null)
  const infoInnerRef = useRef(null)

  let watchlist = ''

  let title = ''
  let release_date = ''

  if (type === 'movie') {
    title = card.title
    release_date = card.release_date
    watchlist = useSelector(state => state.savedMovies.savedMovies)
  } else {
    title = card.name
    release_date = card.first_air_date
    watchlist = useSelector(state => state.savedShows.savedShows)
  }

  const { vote_average, poster_path, backdrop_path, id, genre_ids, overview } =
    card

  const show = () => {
    infoRef.current.style.opacity = '1'
    setTimeout(() => {
      infoInnerRef.current.style.opacity = '1'
    }, 200)
  }

  const hide = () => {
    infoRef.current.style.opacity = '0'

    setTimeout(() => {
      infoInnerRef.current.style.opacity = '0'
    }, 200)
  }

  const handleAddWatchlist = () => {
    if (type === 'movie') {
      addMovie(
        id,
        title,
        poster_path,
        backdrop_path,
        release_date,
        vote_average,
        genre_ids,
        overview
      )
    } else {
      addShow(
        id,
        title,
        poster_path,
        backdrop_path,
        release_date,
        vote_average,
        genre_ids,
        overview
      )
    }
  }

  const handleDeleteWatchList = () => {
    if (type === 'movie') {
      deleteMovie(id)
    } else {
      deleteShow(id)
    }
  }

  const playTrailer = () => {
    showPlayer(playerRef, playerInnerRef)
    type === 'movie'
      ? getMovieTrailer786px(id, setPlayerUrl, setPlayerLoading, setPlayerError)
      : getTvTrailer786px(id, setPlayerUrl, setPlayerLoading, setPlayerError)
  }

  return (
    <div className='card'>
      <div
        className={'card--image ' + (mode === true ? 'lightBg2' : 'darkBg1')}
      >
        {backdrop_path === null ? (
          <span className='img-icon-1'>{iconsData.imageIcon}</span>
        ) : (
          <img
            className='img-1'
            src={APIs.img_path_w780 + backdrop_path}
            alt={title}
            load='lazy'
          />
        )}

        {poster_path === null ? (
          <span className='img-icon-2'>{iconsData.imageIcon}</span>
        ) : (
          <img
            className='img-2'
            src={APIs.img_path_w342 + poster_path}
            alt={title}
            load='lazy'
          />
        )}
      </div>

      {user && watchlist && watchlist.length === 0 && (
        <p className='card__add__btn' onClick={() => handleAddWatchlist()}>
          <span className='card__btn--icon'>{iconsData.addBookmark}</span>
        </p>
      )}

      {/* ADD-BUTTON */}
      {user &&
        watchlist &&
        watchlist.length > 0 &&
        watchlist.every((item, index) => item.id !== id) && (
          <p
            key={id}
            className='card__add__btn'
            onClick={() => handleAddWatchlist()}
          >
            <span className='card__btn--icon'>{iconsData.addBookmark}</span>
          </p>
        )}

      {/* DELETE-BUTTON */}
      {user &&
        watchlist &&
        watchlist.length > 0 &&
        watchlist.map((item, index) => {
          if (item.id === id) {
            return (
              <p
                key={index}
                className='card__delete__btn'
                onClick={() => handleDeleteWatchList()}
                style={{ background: 'gold' }}
              >
                <span className='card__btn--icon' style={{ color: '#000' }}>
                  {iconsData.addedBookmark}
                </span>
              </p>
            )
          }
        })}

      {/* ADD-BUTTON (without user) */}
      {!user && (
        <p className='card__btn ' onClick={() => navigate('/login')}>
          <span className='card__btn--icon'>{iconsData.addBookmark}</span>
        </p>
      )}

      <div className={'card__rating ' + getClassBg(vote_average)}>
        <CircularProgressbar
          value={vote_average * 10}
          strokeWidth={5}
          styles={buildStyles({
            pathColor: '#fff'
          })}
        />
        <span>{Number(String(vote_average).substring(0, 3))}</span>
      </div>

      <div
        ref={infoRef}
        className={
          'card__info ' +
          (mode === true
            ? 'lightAlpha5 darkColor1 darkOutline'
            : 'darkAlpha5 lightColor1 lightOutline')
        }
        onMouseOver={show}
        onMouseLeave={hide}
      >
        <div ref={infoInnerRef} className='card__info__inner'>
          <p className='card__info__inner--title'>
            {title && title.length <= 35
              ? title
              : title.substring(0, 32) + '...'}
          </p>

          <span className='card__info__inner--date'>
            {release_date && moment(release_date).format('Do MMM, YYYY')}
          </span>

          <div className='card__info__inner__options'>
            {/* ADD-BUTTON */}
            {user &&
              watchlist &&
              watchlist.length > 0 &&
              watchlist.every((item, index) => item.id !== id) && (
                <p
                  key={id}
                  className={
                    'card__info__inner__options__add__btn ' +
                    (mode === true ? 'darkOption' : 'lightOption')
                  }
                  onClick={() => handleAddWatchlist()}
                >
                  <span className='card__info__inner__options__btn--icon'>
                    {iconsData.addBookmark}
                  </span>
                </p>
              )}

            {/* DELETE-BUTTON */}
            {user &&
              watchlist &&
              watchlist.length > 0 &&
              watchlist.map((item, index) => {
                if (item.id === id) {
                  return (
                    <p
                      key={index}
                      className={
                        'card__info__inner__options__delete__btn ' +
                        (mode === true ? 'darkOption' : 'lightOption')
                      }
                      onClick={() => handleDeleteWatchList()}
                      style={{ background: 'gold' }}
                    >
                      <span
                        className='card__info__inner__options__btn--icon'
                        style={{ color: '#000' }}
                      >
                        {iconsData.addedBookmark}
                      </span>
                    </p>
                  )
                }
              })}

            {/* ADD-BUTTON (without user) */}
            {!user && (
              <p
                className={
                  'card__info__inner__options__btn ' +
                  (mode === true ? 'darkOption' : 'lightOption')
                }
                onClick={() => navigate('/login')}
              >
                <span className='card__info__inner__options__btn--icon'>
                  {iconsData.addBookmark}
                </span>
              </p>
            )}

            <p
              onClick={() => playTrailer()}
              className={
                'card__info__inner__options__play-btn ' +
                (mode === true ? 'darkOption' : 'lightOption')
              }
            >
              <span>{iconsData.play1}</span>
            </p>

            <Link
              to={`/${type}/${id}`}
              className={
                'card__info__inner__options--more ' +
                (mode === true ? 'darkOption' : 'lightOption')
              }
            >
              <span>{iconsData.forward}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
