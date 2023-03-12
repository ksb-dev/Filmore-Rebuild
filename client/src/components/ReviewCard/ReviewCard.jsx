import React, { useRef } from 'react'

// Context
import { useMovieContext } from '../../context/context'

// APIs
import { APIs } from '../../APIs/APIs'

// React Icons
import { GrStar } from 'react-icons/gr'

// data
import { iconsData } from '../../data/icons'

// components
import ReviewModal from '../ReviewModal/ReviewModal'

const ReviewCard = ({ review }) => {
  const { mode } = useMovieContext()
  const { avatar_path, name, username, rating } = review.author_details
  const { content } = review

  const reviewModalRef = useRef(null)
  const reviewModalInnerRef = useRef(null)

  const showReviewModal = () => {
    reviewModalRef.current.style.transform = 'scale(1)'
  }

  return (
    <div
      className={
        'review__card ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
      }
    >
      <div className='avatar__rating'>
        <div
          className={
            'avatar__rating__image ' + (mode === true ? 'lightBg2' : 'darkBg1')
          }
        >
          {avatar_path !== null && !avatar_path.startsWith('/https') ? (
            <img src={APIs.img_path + avatar_path} alt='User' />
          ) : (
            <p className='user'>
              <span>{iconsData.person}</span>
            </p>
          )}
        </div>

        {rating && (
          <span className='rating'>
            <GrStar
              size={'25px'}
              style={{ color: 'var(--primary)', marginRight: '0.25rem' }}
            />
            {rating}
          </span>
        )}
      </div>
      <div className='name__review'>
        <span className='name'>{name ? name : 'Anonymous'}</span>

        <span className='content'>{content.substring(0, 100) + '.....'}</span>
        <span
          style={{
            color: 'var(--blue)',
            fontWeight: '400',
            cursor: 'pointer'
          }}
          onClick={() => showReviewModal()}
        >
          Read more
        </span>

        {/* {content ? (
          content.length > 95 ? (
            <>
              {!show ? (
                <>
                  <span className='content'>
                    {content.substring(0, 100) + '.....'}
                  </span>
                  <span
                    style={{
                      color: 'var(--blue)',
                      fontWeight: '400',
                      cursor: 'pointer'
                    }}
                    onClick={() => setShow(!show)}
                  >
                    Read more
                  </span>
                </>
              ) : (
                <>
                  <span className='content'>{content}</span>
                  <span
                    style={{
                      color: 'var(--blue)',
                      fontWeight: '400',
                      cursor: 'pointer'
                    }}
                    onClick={() => setShow(!show)}
                  >
                    Hide more
                  </span>
                </>
              )}
            </>
          ) : (
            <span className='content'>{content}</span>
          )
        ) : (
          <></>
        )} */}
      </div>
      <ReviewModal
        review={review}
        reviewModalRef={reviewModalRef}
        reviewModalInnerRef={reviewModalInnerRef}
      />
    </div>
  )
}

export default ReviewCard
