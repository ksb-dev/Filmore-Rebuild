import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

// APIs
import { APIs } from '../../../../APIs/APIs'

const Backdrop = ({ backdrop, index }) => {
  return (
    <div className='backdrop'>
      {/* <img
        src={
          backdrop.file_path !== null
            ? APIs.img_path + backdrop.file_path
            : APIs.no_image_url
        }
        alt={backdrop.file_path}
      /> */}
      <LazyLoadImage
        width={'100%'}
        height={'100%'}
        className='img'
        alt='image'
        effect='blur'
        placeholderSrc={
          backdrop.file_path === null
            ? url
            : APIs.img_path_w92 + backdrop.file_path
        }
        src={
          backdrop.file_path === null
            ? url
            : APIs.img_path_w342 + backdrop.file_path
        }
      />
    </div>
  )
}

export default Backdrop
