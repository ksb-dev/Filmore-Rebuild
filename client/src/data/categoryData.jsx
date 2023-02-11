import React from 'react'

// React Icons
import { BsGraphUp, BsCheck2Circle } from 'react-icons/bs'
import { MdOutlineUpcoming } from 'react-icons/md'
import { TfiStar } from 'react-icons/tfi'

export const categoryArray = [
  {
    icon: <BsGraphUp size={'20px'} style={{marginRight: '5px'}}/>,
    category: 'popular',
    value: 'Popular',
    path: '/'
  },
  {
    icon: <MdOutlineUpcoming size={'20px'} style={{marginRight: '5px'}}/>,
    category: 'upcoming',
    value: 'Upcoming',
    path: '/upcoming'
  },
  {
    icon: <TfiStar size={'20px'} style={{marginRight: '5px'}}/>,
    category: 'top',
    value: 'Top Rated',
    path: '/top'
  },
  {
    icon: <BsCheck2Circle size={'20px'} style={{marginRight: '5px'}}/>,
    category: 'watchlist',
    value: 'Watchlist',
    path: '/watchlist'
  }
]
