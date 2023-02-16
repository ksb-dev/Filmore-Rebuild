import React from 'react'

// data
import { iconsData } from '../../data/icons'

const MenuIcon = ({ menuIconRef }) => {
  return (
    <p ref={menuIconRef} className='menu-icon'>
      {iconsData.menu} <span>Menu</span>
    </p>
  )
}

export default MenuIcon
