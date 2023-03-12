import React from 'react'

// context
import { useMovieContext } from '../../context/context'

// data
import { iconsData } from '../../data/icons'

const ReviewModal = ({ review, reviewModalRef, reviewModalInnerRef }) => {
  const { mode } = useMovieContext()

  const hideReviewModal = () => {
    reviewModalRef.current.style.transform = 'translateY(100%)'
  }

  return (
    <div
      ref={reviewModalRef}
      className={
        'review__modal ' + (mode === true ? 'lightAlpha5' : 'darkAlpha5 ')
      }
    >
      <span className='review__modal--cancel' onClick={() => hideReviewModal()}>
        {iconsData.close3}
      </span>

      <div
        ref={reviewModalInnerRef}
        className={
          'review__modal__inner scroll-1 ' +
          (mode === true ? 'lightBg2' : 'darkBg1 ')
        }
      >
        <span>{review.content}</span>
      </div>
    </div>
  )
}

export default ReviewModal
