import React from 'react'

// context
import { useMovieContext } from '../../../../context/context'

const Video = ({ video }) => {
  const { mode } = useMovieContext()

  return (
    <div className='video'>
      <iframe
        src={`https://www.youtube.com/embed/${video.key}`}
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
