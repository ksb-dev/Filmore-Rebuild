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
import ActorDetail from './pages/ActorDetail/ActorDetail'
import MovieCast from './pages/MovieCast/MovieCast'
import TvCast from './pages/TvCast/TvCast'
import MovieBackdrops from './pages/MovieBackdrops/MovieBackdrops'
import TvBackdrops from './pages/TvBackdrops/TvBackdrops'
import MovieVideos from './pages/MovieVideos/MovieVideos'
import TvVideos from './pages/TvVideos/TvVideos'

const App = () => {
  const { mode } = useMovieContext()

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
          <Route path='/actor/:id' element={<ActorDetail />} />
          <Route path='/movie/cast/:id' element={<MovieCast />} />
          <Route path='/tv/cast/:id' element={<TvCast />} />
          <Route path='/movie/backdrops/:id' element={<MovieBackdrops />} />
          <Route path='/tv/backdrops/:id' element={<TvBackdrops />} />
          <Route path='/movie/videos/:id' element={<MovieVideos />} />
          <Route path='/tv/videos/:id' element={<TvVideos />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
