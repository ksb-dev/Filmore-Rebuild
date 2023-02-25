import React from 'react'

// context
import { useMovieContext } from '../../context/context'

// components
import Review from './Review/Review'

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
        {/* <span className='icon'>{iconsData.forwardArrow}</span> */}
      </div>
      <div className='reviews__container'>
        {reviews &&
          reviews.length > 0 &&
          reviews.map((review, index) => (
            <Review key={index} review={review} />
          ))}
      </div>
    </div>
  )
}

export default Reviews
