import React from 'react'

// APIs
import { APIs } from '../../../../APIs/APIs'

const Backdrop = ({ backdrop, index }) => {
  return (
    <div className='backdrop'>
      <img
        src={
          backdrop.file_path !== null
            ? APIs.img_path + backdrop.file_path
            : APIs.no_image_url
        }
        alt={backdrop.file_path}
      />
    </div>
  )
}

export default Backdrop
