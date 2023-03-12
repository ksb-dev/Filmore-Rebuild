import React from 'react'

// React Icons
import { BsGraphUp } from 'react-icons/bs'
import { MdOutlineUpcoming } from 'react-icons/md'
import { TfiStar } from 'react-icons/tfi'

export const categoryArray = [
  {
    icon: <BsGraphUp size={'15px'} style={{ marginRight: '0.5rem' }} />,
    category: 'popular',
    value: 'Popular',
    path: '/'
  },
  {
    icon: <MdOutlineUpcoming size={'15px'} style={{ marginRight: '0.5rem' }} />,
    category: 'theatres',
    value: 'In Theatres',
    path: '/theatres'
  },
  {
    icon: <TfiStar size={'15px'} style={{ marginRight: '0.5rem' }} />,
    category: 'top',
    value: 'Top Rated',
    path: '/top'
  }
  // {
  //   icon: <BsCheck2Circle size={'20px'} style={{ marginRight: '0.5rem' }} />,
  //   category: 'watchlist',
  //   value: 'Favourites',
  //   path: '/watchlist'
  // }
]
