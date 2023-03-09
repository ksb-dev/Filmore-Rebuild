import React, { useEffect } from 'react'

// react router dom
import { useParams } from 'react-router-dom'

// hooks
import { useGetMovieInfo } from '../../hooks/useGetMovieInfo'

// APIs
import { APIs } from '../../APIs/APIs'

// context
import { useMovieContext } from '../../context/context'

// components
import Header from '../../components/Header/Header'
import SmallHeader from '../../components/Header/SmallHeader/SmallHeader'
import Menu from '../../components/Menu/Menu'
import SearchModal from '../../components/SearchModal/SearchModal'
import BackdropCard from '../../components/BackdropCard/BackdropCard'
import ImageViewer from '../../components/ImageViewer/ImageViewer'

// other
import Loading from '../../other/Loading/Loading'
import Error from '../../other/Error/Error'

// data
import { iconsData } from '../../data/icons'

const MovieBackdrops = () => {
  const { id } = useParams()
  const {
    mode,
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    backdropIndex,
    setBackdropIndex,
    backdrops,
    setBackdrops,
    backdropsError,
    setBackdropsError,
    backdropsLoading,
    setBackdropsLoading
  } = useMovieContext()
  const { getMovieInfo, getMovieBackdrops } = useGetMovieInfo()

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    getMovieInfo(id, setData, setLoading, setError)

    getMovieBackdrops(id, setBackdrops, setBackdropsLoading, setBackdropsError)
  }, [])

  return (
    <div
      className={
        'movie__backdrops ' +
        (mode === true ? 'lightBg1 darColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
      <SmallHeader />
      <Menu />
      <SearchModal />
      <ImageViewer />

      {loading && (
        <div className='loading'>
          <Loading />
        </div>
      )}

      {error && (
        <div className='error'>
          <Error msg={'Failed to fetch backdrops'} />
        </div>
      )}

      {!loading && !error && (
        <div className='movie__backdrops__inner'>
          <div className='movie__backdrops__inner__detail'>
            <span className='movie__backdrops__inner__detail--title'>
              {data.title}
            </span>

            <span className='movie__backdrops__inner__detail--tagline'>
              {data.tagline}
            </span>

            <div className='movie__backdrops__inner__detail--image'>
              {data.backdrop_path === null ? (
                <span
                  className={
                    'img-icon ' + (mode === true ? 'lightBg2' : 'darkBg1')
                  }
                >
                  {iconsData.imageIcon}
                </span>
              ) : (
                <img
                  className='img'
                  src={APIs.img_path_w780 + data.backdrop_path}
                  alt={data.title}
                  load='lazy'
                />
              )}

              <div
                className={
                  'cover ' +
                  (mode === true ? 'lightGradient2' : 'darkGradient2')
                }
              ></div>
            </div>
          </div>

          <div className='movie__backdrops__inner__full'>
            <div className='movie__backdrops__inner__full--title'>
              <span className='title'>All Backdrops</span>
              <p className='length'>
                <span>{backdrops && backdrops.length}</span>
              </p>
            </div>

            {backdropsLoading && (
              <span className='backdrops-loading'>
                <Loading />
              </span>
            )}

            {backdropsError && (
              <span className='backdrops-loading'>
                <Error msg={'No backdrops found.'} />
              </span>
            )}

            <div className='movie__backdrops__inner__full__backdrops'>
              {backdrops &&
                backdrops.map((backdrop, index) => (
                  <BackdropCard key={index} backdrop={backdrop} index={index} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieBackdrops
