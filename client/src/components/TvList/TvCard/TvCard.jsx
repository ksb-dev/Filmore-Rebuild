import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'

// data
import { iconsData } from '../../../data/icons'

// Hooks
import { useWatchlistOperations } from '../../../hooks/useWatchlistOperations'
import { useGetClassByVote } from '../../../hooks/useGetClassByVote'

// Redux
import { useSelector } from 'react-redux'

// Recat Router
import { Link, useNavigate } from 'react-router-dom'

// Context
import { useMovieContext } from '../../../context/context'

const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const TvCard = ({ tv }) => {
  const { mode } = useMovieContext()
  const { addWatchlist, deleteWatchlist } = useWatchlistOperations()
  const { getClassBg } = useGetClassByVote()

  const watchlist = useSelector(state => state.watchlist.watchlist)

  const ratingTitleDateRef = useRef(null)
  const addBtnRef = useRef(null)

  const navigate = useNavigate()

  const [bookmark, setBookmark] = useState(false)

  const {
    name,
    vote_average,
    first_air_date,
    poster_path,
    backdrop_path,
    id,
    genre_ids,
    overview
  } = tv

  useEffect(() => {
    if (watchlist && watchlist.length > 0) {
      for (let i = 0; i < (watchlist && watchlist.length); i++) {
        if (watchlist[i].id === id) {
          setBookmark(true)
        }
      }
    }

    if (watchlist && watchlist.length === 0) setBookmark(false)
  }, [watchlist, id])

  const show = () => {
    ratingTitleDateRef.current.style.opacity = '1'
  }

  const hide = () => {
    ratingTitleDateRef.current.style.opacity = '0'
  }

  return (
    <div className='card'>
      <img
        className='card--image'
        src={poster_path === null ? url : IMG_PATH + poster_path}
        alt={name}
      />

      {/* ADD-BUTTON */}
      {sessionStorage.getItem('name') !== null && bookmark === false && (
        <p
          ref={addBtnRef}
          className='card__add__btn '
          onClick={() =>
            addWatchlist(
              id,
              title,
              poster_path,
              backdrop_path,
              release_date,
              vote_average,
              setBookmark,
              genre_ids,
              overview
            )
          }
        >
          <span className='card__btn--icon'>{iconsData.star}</span>
        </p>
      )}

      {/* DELETE-BUTTON */}
      {sessionStorage.getItem('name') !== null && bookmark === true && (
        <p
          ref={addBtnRef}
          className='card__delete__btn '
          style={{ color: 'var(--red)' }}
          onClick={() => deleteWatchlist(id, setBookmark)}
        >
          <span className='card__btn--icon' style={{ color: 'var(--red)' }}>
            {iconsData.star}
          </span>
        </p>
      )}

      {/* ADD-BUTTON (without user) */}
      {sessionStorage.getItem('name') === null && (
        <p
          ref={addBtnRef}
          className='card__btn '
          onClick={() => navigate('/login')}
        >
          <span className='card__btn--icon'>{iconsData.star}</span>
        </p>
      )}

      {/* CARD-INFO */}
      <div
        to='#'
        ref={ratingTitleDateRef}
        onMouseOver={show}
        onMouseLeave={hide}
        className={
          'card__info ' + (mode === true ? 'lightCardInfo' : 'darkCardInfo')
        }
      >
        {vote_average ? (
          <span
            className={`card__info--rating ${getClassBg(
              Number(String(vote_average).substring(0, 3))
            )}`}
          >
            {Number(String(vote_average).substring(0, 3))}
          </span>
        ) : (
          <span className='rating red'>0.0</span>
        )}

        <div className='card__info__inner'>
          <span className='card__info__inner--title'>
            {name ? (
              name.length >= 50 ? (
                name.substring(0, 45) + '...'
              ) : (
                name
              )
            ) : (
              <></>
            )}
          </span>
          <span className='card__info__inner--date'>
            {first_air_date ? (
              moment(first_air_date).format('Do MMM, YYYY')
            ) : (
              <></>
            )}
          </span>
        </div>

        <Link
          to={`/movie/${id}`}
          className={`card__info--more ${getClassBg(vote_average)}`}
        >
          View More
        </Link>
      </div>
    </div>
  )
}

export default TvCard
