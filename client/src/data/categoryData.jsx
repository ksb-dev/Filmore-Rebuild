import React, { useEffect } from 'react'

// React Icons
// import { BsGraphUp, BsCheck2Circle } from 'react-icons/bs'
// import { MdOutlineUpcoming } from 'react-icons/md'
// import { TfiStar } from 'react-icons/tfi'

export const categoryArray = [
  {
    //icon: <BsGraphUp size={'20px'} style={{ marginRight: '0.5rem' }} />,
    category: 'popular',
    value: 'Popular',
    path: '/'
  },
  {
    //icon: <MdOutlineUpcoming size={'20px'} style={{ marginRight: '0.5rem' }} />,
    category: 'theatres',
    value: 'In Theatres',
    path: '/theatres'
  },
  {
    //icon: <TfiStar size={'20px'} style={{ marginRight: '0.5rem' }} />,
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
