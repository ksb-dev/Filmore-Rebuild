import React from 'react'

// recat router dom
import { Link } from 'react-router-dom'

// context
import { useMovieContext } from '../../../../context/context'

// APIs
import { APIs } from '../../../../APIs/APIs'

// data
import { iconsData } from '../../../../data/icons'

const Actor = ({ actor }) => {
  const { mode } = useMovieContext()
  const { original_name, character, profile_path, id } = actor

  return (
    <Link
      to={`/actor/${id}`}
      className={
        'actor ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
      }
    >
      <div
        className={'actor__image ' + (mode === true ? 'lightBg2' : 'darkBg1')}
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
      </div>
      <div className='actor__name-character'>
        <span className='name'>{original_name && original_name}</span>
        <span className='character'>{character && character}</span>
      </div>
    </Link>
  )
}

export default Actor
