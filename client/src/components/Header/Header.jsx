import React from 'react'

// Recat router dom
import { Link } from 'react-router-dom'

// context
import { useMovieContext } from '../../context/context'

// data
import { iconsData } from '../../data/icons'

const Header = () => {
  const { mode, setMode } = useMovieContext()

  return (
    <div
      className={
        'header ' +
        (mode === true ? 'lightBg1 darkColor1' : 'darkBg1 lightColor1')
      }
    >
      <div className='header__options'>
        <div className='header__options__one'>
          <Link
            to='/'
            className={
              'title ' + (mode === true ? 'darkColor1' : 'lightColor1')
            }
          >
            <span className='title__part--1'>Film</span>
            <span className='title__icon'>{iconsData.film}</span>
            <span className='title__part--2'>pedia</span>
          </Link>
          {/* <span className='categories'>categories</span>
          <span className='genre'>genre</span> */}
        </div>

        <div className='header__options__two'>
          <span
            onClick={() => setMode(!mode)}
            className={'mode-icon ' + (mode === true ? 'lightBg1' : 'darkBg1')}
          >
            {mode === true ? iconsData.sunIcon : iconsData.moonIcon}
          </span>

          <Link
            to='/search'
            className={
              'search-icon ' +
              (mode === true ? 'lightBg1 darColor1' : 'darkBg1 lightColor1')
            }
          >
            {iconsData.searchIcon}
          </Link>

          <span
            className={'user-icon ' + (mode === true ? 'lightBg1' : 'darkBg1')}
          >
            {iconsData.login}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Header
