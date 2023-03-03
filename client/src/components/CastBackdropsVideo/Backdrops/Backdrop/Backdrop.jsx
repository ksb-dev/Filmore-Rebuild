import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/black-and-white.css'

// APIs
import { APIs } from '../../../../APIs/APIs'

// context
import { useMovieContext } from '../../../../context/context'

// hooks
import { useShowHide } from '../../../../hooks/useShowHide'

const Backdrop = ({ backdrop, index }) => {
  const { mode, setBackdropIndex, viewerRef, innerViewerRef } =
    useMovieContext()
  const { showViewer } = useShowHide()

  const handleClick = () => {
    setBackdropIndex(index)
    showViewer(viewerRef, innerViewerRef)
  }

  return (
    <div
      className={'backdrop ' + (mode === true ? 'lightBg2' : 'darkBg1')}
      onClick={() => handleClick()}
    >
      <img
        className='img'
        src={
          backdrop.file_path === null
            ? APIs.no_image_url
            : APIs.img_path_w780 + backdrop.file_path
        }
        alt='backdrop'
        load='lazy'
      />

      {/* <LazyLoadImage
        width={'100%'}
        height={'100%'}
        className='img'
        alt='image'
        effect='black-and-white'
        placeholderSrc={
          backdrop.file_path === null
            ? APIs.no_image_url
            : APIs.img_path_original + backdrop.file_path
        }
        src={
          backdrop.file_path === null
            ? APIs.no_image_url
            : APIs.img_path_original + backdrop.file_path
        }
      /> */}
    </div>
  )
}

export default Backdrop
