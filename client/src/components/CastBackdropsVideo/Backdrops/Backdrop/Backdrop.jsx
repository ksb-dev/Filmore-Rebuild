import React from 'react'
// import { LazyLoadImage } from 'react-lazy-load-image-component'
// import 'react-lazy-load-image-component/src/effects/blur.css'

// APIs
import { APIs } from '../../../../APIs/APIs'

// context
import { useMovieContext } from '../../../../context/context'

const Backdrop = ({ backdrop, index }) => {
  const { mode } = useMovieContext()

  return (
    <div className={'backdrop ' + (mode === true ? 'lightBg2' : 'darkBg1')}>
      <img
        className='img'
        loading='lazy'
        src={
          backdrop.file_path !== null
            ? APIs.img_path + backdrop.file_path
            : APIs.no_image_url
        }
        alt={backdrop.file_path}
      />
      {/* <LazyLoadImage
        width={'100%'}
        height={'100%'}
        className='img'
        alt='image'
        effect='blur'
        placeholderSrc={
          backdrop.file_path === null
            ? url
            : APIs.img_path_w342 + backdrop.file_path
        }
        src={
          backdrop.file_path === null
            ? url
            : APIs.img_path_w342 + backdrop.file_path
        }
      /> */}
    </div>
  )
}

export default Backdrop
