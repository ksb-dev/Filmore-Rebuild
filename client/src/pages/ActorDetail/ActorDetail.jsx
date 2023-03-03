import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/black-and-white.css'

// context
import { useMovieContext } from '../../context/context'

// hooks
import { useGetMovieInfo } from '../../hooks/useGetMovieInfo'

// react router dom
import { useParams } from 'react-router-dom'

// components
import Header from '../../components/Header/Header'
import SmallHeader from '../../components/Header/SmallHeader/SmallHeader'
import Menu from '../../components/Menu/Menu'
import SearchModal from '../../components/SearchModal/SearchModal'

// other
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'

// APIs
import { APIs } from '../../APIs/APIs'

const ActorDetail = () => {
  const { id } = useParams()
  const { mode } = useMovieContext()
  const { getActorDetail } = useGetMovieInfo()

  const [actorDetail, setActorDetail] = useState('')
  const [actorDetailLoading, setActorDetailLoading] = useState(true)
  const [actorDetailError, setActorDetailError] = useState('')

  const { imdb_id, name, birthday, place_of_birth, profile_path, biography } =
    actorDetail

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    getActorDetail(
      id,
      setActorDetail,
      setActorDetailLoading,
      setActorDetailError
    )
  }, [])

  const humanReadableDate = new Date(birthday).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div
      className={
        'actor__detail ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
      <SmallHeader />
      <Menu />
      <SearchModal />

      <div className='actor__detail__inner'>
        {actorDetailLoading && (
          <span className='actor__detail__inner__loading'>
            <Loading />
          </span>
        )}

        {!actorDetailLoading && actorDetailError && (
          <span className='actor__detail__inner__error'>
            <Error msg={'No details found!'} />
          </span>
        )}

        {!actorDetailLoading && !actorDetailError && (
          <>
            <div className='actor__detail__inner__img-name-birth-place'>
              <div
                className={
                  'actor__detail__inner__img-name-birth-place--image ' +
                  (mode === true ? 'lightBg2' : 'darkBg1')
                }
              >
                <img
                  className='img'
                  src={
                    profile_path !== null
                      ? APIs.img_path + profile_path
                      : APIs.no_image_url
                  }
                  alt='actor'
                />

                {/* <LazyLoadImage
                  width={'100%'}
                  height={'100%'}
                  className='img'
                  alt='image'
                  effect='black-and-white'
                  placeholderSrc={
                    profile_path === null
                      ? APIs.no_image_url
                      : APIs.img_path_w300 + profile_path
                  }
                  src={
                    profile_path === null
                      ? APIs.no_image_url
                      : APIs.img_path_w300 + profile_path
                  }
                /> */}
              </div>
              <div className='actor__detail__inner__img-name-birth-place__detail'>
                <span className='name'>{name && name}</span>
                <span className='tag'>Born</span>
                <span className='birth'>{birthday && humanReadableDate}</span>
                <span className='tag'>Birth-Place</span>
                <span className='place'>
                  {place_of_birth && place_of_birth}
                </span>
              </div>
            </div>

            <div className='actor__detail__inner__bio'>
              <h3>Biography</h3>
              <span>
                {biography ? biography : <span>No details found.</span>}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ActorDetail
