import React from 'react'

// context
import { useMovieContext } from '../../context/context'

// data
import { iconsData } from '../../data/icons'

const ReviewModal = ({ review, reviewModalRef, reviewModalInnerRef }) => {
  const { mode } = useMovieContext()

  const hideReviewModal = () => {
    reviewModalRef.current.style.transform = 'scale(0)'
  }

  return (
    <div
      ref={reviewModalRef}
      className={
        'review__modal ' + (mode === true ? 'lightAlpha6' : 'darkAlpha6 ')
      }
    >
      <span className='review__modal--cancel' onClick={() => hideReviewModal()}>
        {iconsData.close3}
      </span>

      <div
        ref={reviewModalInnerRef}
        className={
          'review__modal__inner ' + (mode === true ? 'lightBg1' : 'darkBg2 ')
        }
      >
        <span>{review.content}</span>
      </div>
    </div>
  )
}

export default ReviewModal
