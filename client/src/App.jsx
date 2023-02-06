import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// context
import { useMovieContext } from './context/context'

// components
import Home from './pages/Home/Home'
import Upcoming from './pages/Upcoming/Upcoming'
import TopRated from './pages/TopRated/TopRated'
import Search from './pages/Search/Search'

const App = () => {
  const { mode } = useMovieContext()

  return (
    <div className={'app ' + (mode === true ? 'lightBg1' : 'darkBg1')}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/upcoming' element={<Upcoming />} />
          <Route path='/top' element={<TopRated />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
