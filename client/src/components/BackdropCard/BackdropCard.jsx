import React from 'react'

// APIs
import { APIs } from '../../APIs/APIs'

// context
import { useMovieContext } from '../../context/context'

// hooks
import { useShowHide } from '../../hooks/useShowHide'

const BackdropCard = ({ backdrop, index }) => {
  const { mode, setBackdropIndex, viewerRef, innerViewerRef } =
    useMovieContext()
  const { showViewer } = useShowHide()

  const handleClick = () => {
    setBackdropIndex(index)
    showViewer(viewerRef, innerViewerRef)
  }

  return (
    <div
      className={'backdrop__card ' + (mode === true ? 'lightBg2' : 'darkBg1')}
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
    </div>
  )
}

export default BackdropCard
