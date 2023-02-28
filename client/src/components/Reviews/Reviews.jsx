import React from 'react'

// data
import { iconsData } from '../../data/icons'

// context
import { useMovieContext } from '../../context/context'

// components
import Review from './Review/Review'

// other
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'

const Reviews = ({ reviews, reviewsLoading, reviewsError }) => {
  const { mode } = useMovieContext()

  return (
    <div
      className={
        'reviews ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
      }
    >
      <div className='reviews__title'>
        Reviews
        <p className='length'>
          <span>{reviews && reviews.length}</span>
        </p>
        <span className='icon'>{iconsData.forwardArrow}</span>
      </div>

      <div className='reviews__loading__error'>
        {reviewsLoading && (
          <span>
            <Loading />
          </span>
        )}
        {!reviewsLoading && reviewsError && <Error msg={'No reviews found.'} />}
        {!reviewsLoading &&
          !reviewsError &&
          reviews &&
          reviews.length === 0 && <Error msg={'No reviews found.'} />}
      </div>

      <div className='reviews__container'>
        {reviews &&
          reviews.length > 0 &&
          reviews.map(
            (review, index) =>
              index < 4 && <Review key={index} review={review} />
          )}
      </div>
    </div>
  )
}

export default Reviews
