import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'

// context
import { useMovieContext } from './context/context'

// components
import Home from './pages/Home/Home'
import Search from './pages/Search/Search'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Watchlist from './pages/Watchlist/Watchlist'
import MovieDetail from './pages/MovieDetail/MovieDetail'
import TvDetail from './pages/TvDetail/TvDetail'

const App = () => {
  const movieResults = useSelector(state => state.movieResults.movieResults)
  const tvResults = useSelector(state => state.tvResults.tvResults)

  const { mode, searchOptionState, movieState, searchQuery, setType } =
    useMovieContext()

  //const type = sessionStorage.getItem('movieState')

  // useEffect(() => {
  //   type = sessionStorage.getItem('movieState')
  // }, [movieState])

  // useEffect(() => {
  //   setType(sessionStorage.getItem('movieState'))

  //   if (
  //     searchQuery &&
  //     searchOptionState === 'movie' &&
  //     movieResults &&
  //     movieResults.length > 0
  //   ) {
  //     setType('movie')
  //     sessionStorage.setItem('movieState', 'movie')
  //     console.log(1)
  //   }

  //   if (
  //     searchQuery &&
  //     searchOptionState === 'tv' &&
  //     tvResults &&
  //     tvResults.length > 0
  //   ) {
  //     setType('tv')
  //     sessionStorage.setItem('movieState', 'tv')
  //     console.log(2)
  //   }
  // }, [movieResults, tvResults, movieState, searchOptionState])

  return (
    <div className={'app ' + (mode === true ? 'lightBg1' : 'darkBg2')}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/watchlist' element={<Watchlist />} />
          <Route path='/movie/:id' element={<MovieDetail />} />
          <Route path='/tv/:id' element={<TvDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
