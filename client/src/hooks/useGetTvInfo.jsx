import { useCallback } from 'react'

export const useGetTvInfo = () => {
  // Get movie info
  const getInfo = async (id, setData, setLoading, setError) => {
    const type = 'tv'
    //sessionStorage.getItem('movieState') === 'movie' ? 'movie' : 'tv'

    try {
      const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${
        import.meta.env.VITE_KEY
      }&language=en-US`

      const res = await fetch(url)
      const data = await res.json()

      if (data) {
        setData(data)
        setLoading(false)
        setError('')
      }
    } catch (error) {
      setData('')
      setLoading(false)
      setError('No details found.')
    }
  }

  // Get cast
  const getCast = async (id, setCast, setCastLoading, setCastError) => {
    const type = 'tv'
    //sessionStorage.getItem('movieState') === 'movie' ? 'movie' : 'tv'

    try {
      const url = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${
        import.meta.env.VITE_KEY
      }&language=en-US`

      setCastLoading(true)
      setCastError('')

      const res = await fetch(url)
      const data = await res.json()

      if (data) {
        setCast(data.cast)
        setCastLoading(false)
        setCastError('')
      }
    } catch (error) {
      setCast('')
      setCastLoading(false)
      setCastError('No cast found.')
    }
  }

  // Get backdrops
  const getBackdrops = async (
    id,
    setBackdrops,
    setBackdropsLoading,
    setBackdropsError
  ) => {
    const type = 'tv'
    //sessionStorage.getItem('movieState') === 'movie' ? 'movie' : 'tv'

    const url = `
https://api.themoviedb.org/3/${type}/${id}/images?api_key=${
      import.meta.env.VITE_KEY
    }`

    setBackdropsLoading(true)
    setBackdropsError('')

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data) {
        setBackdropsLoading(false)
        setBackdrops(data.backdrops)
        setBackdropsError('')
      }
    } catch (error) {
      setBackdrops('')
      setBackdropsLoading(false)
      setBackdropsError('Backdrops not found.')
    }
  }

  // Get trailer
  const getTrailer = async (
    id,
    setTrailerUrl,
    setPlayerLoading,
    setPlayerError
  ) => {
    const type = 'tv'
    //sessionStorage.getItem('movieState') === 'movie' ? 'movie' : 'tv'

    try {
      setPlayerLoading(true)
      setPlayerError('')

      let response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${
          import.meta.env.VITE_KEY
        }&language=en-US`
      )
      let trailerUrl = await response.json()
      let value = ''

      trailerUrl.results.map(result => {
        if (result.official === true) {
          value = result.key
          setTrailerUrl(result.key)
        }
      })

      if (value === '') {
        setTrailerUrl(trailerUrl.results[0].key)
      }

      setPlayerLoading(false)
      setPlayerError('')
    } catch (error) {
      setPlayerLoading(false)
      setPlayerError('Failed to play video')
    }
  }

  // Get reviews
  const getReviews = async (
    id,
    setReviews,
    setReviewsLoading,
    setReviewsError
  ) => {
    const type = 'tv'
    //sessionStorage.getItem('movieState') === 'movie' ? 'movie' : 'tv'

    const url = `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${
      import.meta.env.VITE_KEY
    }&language=en-US&page=1`

    setReviewsLoading(true)
    setReviewsError(true)

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data) {
        setReviews(data.results)
        setReviewsLoading(false)
        setReviewsError(false)
      }
    } catch (err) {
      setReviewsLoading(false)
      setReviewsError(true)
    }
  }

  // Get videos
  const getVideos = async (id, setVideos, setVideosLoading, setVideosError) => {
    const type = 'tv'
    //sessionStorage.getItem('movieState') === 'movie' ? 'movie' : 'tv'

    const url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${
      import.meta.env.VITE_KEY
    }&language=en-US`

    setVideosLoading(true)
    setVideosError(true)

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data) {
        setVideos(data.results)
        setVideosLoading(false)
        setVideosError(false)
      }
    } catch (err) {
      setVideosLoading(false)
      setVideosError(true)
    }
  }

  // Get actor detail
  const getActorDetail = async (
    id,
    setActorDetail,
    setActorDetailLoading,
    setActorDetailError
  ) => {
    const url = `https://api.themoviedb.org/3/person/${id}?api_key=${
      import.meta.env.VITE_KEY
    }&language=en-US`
    setActorDetailLoading(true)
    setActorDetailError(true)

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data) {
        setActorDetail(data)
        setActorDetailLoading(false)
        setActorDetailError(false)
      }
    } catch (err) {
      setActorDetailLoading(false)
      setActorDetailError(true)
    }
  }

  // Get movie crew
  const getMovieCrew = async (id, setCrew, setCrewLoading, setCrewError) => {
    const type = 'tv'
    //sessionStorage.getItem('movieState') === 'movie' ? 'movie' : 'tv'

    const url = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${
      import.meta.env.VITE_KEY
    }&language=en-US`
    setCrewLoading(true)
    setCrewError(true)

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data) {
        setCrew(data)
        setCrewLoading(false)
        setCrewError(false)
      }
    } catch (err) {
      setCrewLoading(false)
      setCrewError(true)
    }
  }

  return {
    getInfo,
    getCast,
    getBackdrops,
    getTrailer,
    getReviews,
    getVideos,
    getActorDetail,
    getMovieCrew
  }
}
