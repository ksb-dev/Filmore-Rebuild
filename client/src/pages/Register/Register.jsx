import React from 'react'

// context
import { useMovieContext } from '../../context/context'

// components
import Header from '../../components/Header/Header'

const Register = () => {
  const { mode } = useMovieContext()

  return (
    <div
      className={
        'register ' +
        (mode === true ? 'lightBg2 darColor1' : 'darkBg2 lightColor1')
      }
    >
      <Header />
    </div>
  )
}

export default Register
