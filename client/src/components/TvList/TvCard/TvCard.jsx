import React from 'react'
import moment from 'moment'
// import { LazyLoadImage } from 'react-lazy-load-image-component'
// import 'react-lazy-load-image-component/src/effects/blur.css'

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

// APIs
import { APIs } from '../../../APIs/APIs'

const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'

const TvCard = ({ tv }) => {
  const { mode } = useMovieContext()
  const { addShow, deleteShow } = useWatchlistOperations()
  const { getClassBg } = useGetClassByVote()

  const user = useSelector(state => state.savedShows.user)
  const savedShows = useSelector(state => state.savedShows.savedShows)

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

  return (
    <div className='card'>
      <Link
        to={`/tv/${id}`}
        className={'card--image ' + (mode === true ? 'lightBg2' : 'darkBg1')}
      >
        <img
          className='img'
          loading='lazy'
          src={
            poster_path === null
              ? APIs.no_image_url
              : APIs.img_path + poster_path
          }
          alt={name}
        />
        {/* <LazyLoadImage
          width={'100%'}
          height={'100%'}
          className='img'
          alt='image'
          effect='blur'
          placeholderSrc={
            poster_path === null ? url : APIs.img_path_w342 + poster_path
          }
          src={poster_path === null ? url : APIs.img_path_w342 + poster_path}
        /> */}
      </Link>

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
          <span className='card__btn--icon'>{iconsData.star}</span>
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
            <span className='card__btn--icon'>{iconsData.star}</span>
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
                <span className='card__btn--icon' style={{ color: '#000' }}>
                  {iconsData.star}
                </span>
              </p>
            )
          }
        })}
      {/* ADD-BUTTON (without user) */}
      {!user && (
        <p className='card__btn ' onClick={() => navigate('/login')}>
          <span className='card__btn--icon'>{iconsData.star}</span>
        </p>
      )}
      {/* CARD-INFO */}
      <Link
        to={`/tv/${id}`}
        className={
          'card__info ' +
          (mode === true ? 'lightBg2 darkColor1' : 'darkBg1 lightColor1')
        }
      >
        <p className='card__info--title'>
          {name && name.length <= 35 ? name : name.substring(0, 32) + '...'}
        </p>

        <div
          className={
            'card__info__date-rating ' +
            (mode === true ? 'lightBg1' : 'darkBg2')
          }
        >
          <span className='card__info__date-rating--date'>
            {first_air_date && moment(first_air_date).format('Do MMM, YYYY')}
          </span>
          <p
            className={
              'card__info__date-rating--rating ' +
              getClassBg(Number(String(vote_average).substring(0, 3)))
            }
          >
            <span>{Number(String(vote_average).substring(0, 3))}</span>
          </p>
        </div>
      </Link>
    </div>
  )
}

export default TvCard
