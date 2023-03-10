import React, { useState } from 'react'

// context
import { useMovieContext } from '../../context/context'

// data
import { iconsData } from '../../data/icons'

const MenuIcon = ({ menuIconRef }) => {
  const { menuState } = useMovieContext()

  return (
    <p ref={menuIconRef} className='menu-icon'>
      {!menuState ? iconsData.menu : iconsData.close2} <span>Menu</span>
    </p>
  )
}

export default MenuIcon
