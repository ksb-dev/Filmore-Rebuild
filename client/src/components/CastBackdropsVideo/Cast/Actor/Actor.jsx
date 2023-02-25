import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

// context
import { useMovieContext } from '../../../../context/context'

// APIs
import { APIs } from '../../../../APIs/APIs'

const Actor = ({ actor }) => {
  const { mode } = useMovieContext()
  const { original_name, character, profile_path, id } = actor

  return (
    <div className={'actor ' + (mode === true ? 'lightBg1' : 'darkBg2')}>
      <div className='actor__image'>
        {/* <img
          src={
            profile_path !== null
              ? APIs.img_path + profile_path
              : APIs.no_image_url
          }
          alt="actor"
        /> */}
        <LazyLoadImage
          width={'100%'}
          height={'100%'}
          className='img'
          alt='image'
          effect='blur'
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
        />
      </div>
      <div className='actor__name-character'>
        <span className='name'>{original_name && original_name}</span>
        <span className='character'>{character && character}</span>
      </div>
    </div>
  )
}

export default Actor
