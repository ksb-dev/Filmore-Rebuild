import React from 'react'

// context
import { useMovieContext } from '../../context/context'

// components
import Header from '../../components/Header/Header'

const Home = () => {
  const { mode } = useMovieContext()

  return (
    <div
      className={
        'home ' + (mode === true ? 'lightBg2 darColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
    </div>
  )
}

export default Home
