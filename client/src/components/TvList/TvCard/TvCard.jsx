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
  const { addShow, deleteShow } = useWatchlistOperations()
  const { getClassBg } = useGetClassByVote()

  const user = useSelector(state => state.savedShows.user)
  const savedShows = useSelector(state => state.savedShows.savedShows)

  //console.log(savedShows)

  const ratingTitleDateRef = useRef(null)

  const navigate = useNavigate()

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

      {user && savedShows && savedShows.length === 0 && (
        <p
          className='card__add__btn '
          onClick={() =>
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
        >
          <span className='card__btn--icon'>{iconsData.addBookmark}</span>
        </p>
      )}

      {/* ADD-BUTTON */}
      {user &&
        savedShows &&
        savedShows.length > 0 &&
        savedShows.every((item, index) => item.id !== id) && (
          <p
            key={id}
            className='card__add__btn '
            onClick={() =>
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
          >
            <span className='card__btn--icon'>{iconsData.addBookmark}</span>
          </p>
        )}

      {/* DELETE-BUTTON */}
      {user &&
        savedShows &&
        savedShows.length > 0 &&
        savedShows.map((item, index) => {
          if (item.id === id) {
            return (
              <p
                key={index}
                className='card__delete__btn '
                onClick={() => deleteShow(id)}
                style={{ background: 'gold' }}
              >
                <span className='card__btn--icon'>
                  {iconsData.deleteBookmark}
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
