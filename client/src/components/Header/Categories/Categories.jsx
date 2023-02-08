// import React from 'react'

// // react router dom
// import { Link } from 'react-router-dom'

// // redux
// import { useSelector, useDispatch } from 'react-redux'
// //import { setWatchlist } from '../../../Redux/Services/setWatchlist'

// // context
// import { useMovieContext } from '../../../context/context'

// // data
// import { categoryArray } from '../../../data/categoryData'

// const Categories = () => {
//   const { mode, categoryRef } = useMovieContext()
//   const savedMovies = useSelector(state => state.savedMovies.savedMovies)
//   const user = useSelector(state => state.watchlist.user)
//   const dispatch = useDispatch()

//   const handleClick = category => {
//     hideMenu(backCoverRef, menuRef)

//     sessionStorage.setItem('page', 1)
//     //sessionStorage.setItem('term', '')
//     //setQuery('')

//     //dispatch(setDefault('All'))
//     dispatch(getMovies(category))

//     if (category === 'watchlist') {
//       if (user) {
//         dispatch(getMovies(category))
//       }
//     } else {
//       dispatch(getMovies(category))
//     }

//     setIndex(0)
//   }

//   return (
//     <div
//       ref={categoryRef}
//       className={
//         'categories ' +
//         (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
//       }
//       //onMouseLeave={() => (categoryRef.current.style.display = 'none')}
//     >
//       <div className='categories__options'>
//         {categoryArray.map((category, index) => {
//           return window.location.pathname === category.path ? (
//             <Link
//               key={index}
//               to={category.path}
//               className={
//                 'categories__options--option ' +
//                 (mode === true
//                   ? 'lightBg1 darkColor1 lightActive'
//                   : 'darkBg2 lightColor1 darkActive')
//               }
//               onClick={() => handleClick(category.category)}
//             >
//               {category.icon} <span>{category.value}</span>
//               {category.value === 'Watchlist' && (
//                 <p className='number'>
//                   <span>{user && watchlist ? watchlist.length : 0}</span>
//                 </p>
//               )}
//             </Link>
//           ) : (
//             <Link
//               key={index}
//               to={category.path}
//               className={
//                 'categories__options--option ' +
//                 (mode === true ? 'lightBg1 darkColor1' : 'darkBg2 lightColor1')
//               }
//               onClick={() => handleClick(category.category)}
//             >
//               {category.icon} <span>{category.value}</span>
//               {category.value === 'Watchlist' && (
//                 <p className='number'>
//                   <span>{user && watchlist ? watchlist.length : 0}</span>
//                 </p>
//               )}
//             </Link>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default Categories
