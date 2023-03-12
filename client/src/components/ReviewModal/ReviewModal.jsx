import React, { useEffect } from 'react'

// context
import { useMovieContext } from '../../context/context'

// data
import { iconsData } from '../../data/icons'

const ReviewModal = ({
  review,
  readMoreRef,
  reviewModalRef,
  reviewModalInnerRef
}) => {
  const { mode } = useMovieContext()

  useEffect(() => {
    const toggleReviewModal = e => {
      if (
        !readMoreRef.current.contains(e.target) &&
        !reviewModalRef.current.contains(e.target)
      ) {
        hideReviewModal()
      }
    }

    document.body.addEventListener('click', toggleReviewModal)

    return () => {
      document.body.removeEventListener('click', toggleReviewModal)
    }
  }, [])

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
