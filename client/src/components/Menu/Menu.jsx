import React, { useEffect } from 'react'

// contetx
import { useMovieContext } from '../../context/context'

// data
import { iconsData } from '../../data/icons'
import { genreArray } from '../../data/genreData'

// hooks
import { useShowHide } from '../../hooks/useShowHide'

const Menu = () => {
  const { mode, menuIconRef, menuRef, menuState, setMenuState } =
    useMovieContext()
  const { showMenu, hideMenu } = useShowHide()

  // Toggle logout & Detect outside click of logout component
  useEffect(() => {
    const toggleMenu = e => {
      if (menuRef.current.contains(e.target)) {
        return
      }
      if (!menuIconRef.current.contains(e.target)) {
        setMenuState(false)
      } else {
        setMenuState(!menuState)
      }
    }

    if (menuState) {
      showMenu(menuRef)
    } else {
      hideMenu(menuRef)
    }

    document.body.addEventListener('click', toggleMenu)

    return () => {
      document.body.removeEventListener('click', toggleMenu)
    }
  }, [menuState])

  return (
    <div
      ref={menuRef}
      className={
        'menu '
        //+
        //(mode === true ? 'lightBg1 darkColor1' : 'darkBg1 lightColor1')
      }
    >
      <div className='title-close'>
        <div className='title'>
          <span className='title__part--1'>Film</span>
          <span className='title__icon'>{iconsData.film}</span>
          <span className='title__part--2'>ra</span>
        </div>
        <p className='close-icon' onClick={() => setMenuState(false)}>
          <span>
            <i className='fa-solid fa-xmark'></i>
          </span>
        </p>
      </div>

      <div className='menu__genre'>
        {genreArray.map(item => (
          <span>
            {item.icon}
            {item.genre}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Menu
