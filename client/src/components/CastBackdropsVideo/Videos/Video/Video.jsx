import React from 'react'

// other
import VideoPlayer from '../../../../other/VideoPlayer/VideoPlayer'

const Video = ({ video }) => {
  return (
    <div className='video'>
      <iframe
        src={`https://www.youtube.com/embed/${video.key}`}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Embedded youtube'
      />
    </div>
  )
}

export default Video
