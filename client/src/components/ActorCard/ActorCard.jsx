import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/black-and-white.css'

// recat router dom
import { Link } from 'react-router-dom'

// context
import { useMovieContext } from '../../context/context'

// APIs
import { APIs } from '../../APIs/APIs'

// data
import { iconsData } from '../../data/icons'

const ActorCard = ({ actor }) => {
  const { mode } = useMovieContext()
  const { original_name, character, profile_path, id } = actor

  return (
    <Link
      to={`/actor/${id}`}
      className={
        'actorCard ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
      }
    >
      <div
        className={
          'actorCard__image ' + (mode === true ? 'lightBg2' : 'darkBg1')
        }
      >
        {profile_path !== null && (
          <img
            className='img'
            src={
              profile_path === null
                ? APIs.no_image_url
                : APIs.img_path_w185 + profile_path
            }
            alt={original_name}
            load='lazy'
          />
        )}

        {profile_path === null && <span>{iconsData.person}</span>}

        {/* <LazyLoadImage
          width={'100%'}
          height={'100%'}
          className='img'
          alt='image'
          effect='black-and-white'
          placeholderSrc={
            profile_path === null
              ? APIs.no_image_url
              : APIs.img_path_w185 + profile_path
          }
          src={
            profile_path === null
              ? APIs.no_image_url
              : APIs.img_path_w185 + profile_path
          }
        /> */}
      </div>
      <div className='actorCard__name-character'>
        <span className='name'>{original_name && original_name}</span>
        <span className='character'>{character && character}</span>
      </div>
    </Link>
  )
}

export default ActorCard
