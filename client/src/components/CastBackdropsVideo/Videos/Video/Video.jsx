import React from 'react'

// context
import { useMovieContext } from '../../../../context/context'

const Video = ({ video }) => {
  const { mode } = useMovieContext()

  return (
    <div className={'video ' + (mode === true ? 'lightBg2' : 'darkBg1')}>
      <iframe
        src={`https://www.youtube.com/embed/${video.key}`}
        loading='lazy'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Embedded youtube'
      />
      <div className='cover'></div>
    </div>
  )
}

export default Video
