export const useShowHide = () => {
  // Toggle sort component
  const showSort = (ref1, ref2) => {
    ref1.current.style.transform = 'rotate(180deg)'
    ref1.current.style.transition = 'all 0.3s ease'
    ref2.current.style.opacity = '1'
    ref2.current.style.zIndex = '5'
  }

  const hideSort = (ref1, ref2) => {
    ref1.current.style.transform = 'rotate(0deg)'
    ref1.current.style.transition = 'all 0.3s ease'
    ref2.current.style.opacity = '0'
    ref2.current.style.zIndex = '-1'
  }

  const showForm = (ref1, ref2) => {
    ref1.current.style.transition = 'all 0s ease'
    ref1.current.style.opacity = '1'
    ref1.current.style.zIndex = '10'
    ref2.current.style.transition = 'all 0.5s ease'
    ref2.current.style.opacity = '1'
  }

  const hideForm = (ref1, ref2) => {
    ref1.current.style.transition = 'all 0s ease'
    ref1.current.style.opacity = '0'
    ref2.current.style.transition = 'all 0.5s ease'
    ref2.current.style.opacity = '0'
    ref2.current.style.zIndex = '-1'
  }

  const showMenu = (ref1, ref2) => {
    ref1.current.style.transform = 'translateY(0%)'
  }

  const hideMenu = (ref1, ref2) => {
    ref1.current.style.transform = 'translateY(-120%)'
  }

  // Toggle logout components
  const showLogout = logoutRef => {
    logoutRef.current.style.opacity = '1'
    logoutRef.current.style.zIndex = '5'
  }

  const hideLogout = logoutRef => {
    logoutRef.current.style.opacity = '0'
    logoutRef.current.style.zIndex = '-1'
  }

  const showPlayer = (ref1, ref2) => {
    ref1.current.style.transition = 'all 0s ease'
    ref1.current.style.opacity = '1'
    ref1.current.style.zIndex = '10'
    ref2.current.style.transition = 'all 0.5s ease'
    ref2.current.style.opacity = '1'
  }

  const hidePlayer = (ref1, ref2) => {
    ref1.current.style.transition = 'all 0s ease'
    ref1.current.style.opacity = '0'
    ref2.current.style.transition = 'all 0.5s ease'
    ref2.current.style.opacity = '0'
    ref2.current.style.zIndex = '-1'
  }

  const showViewer = (ref1, ref2) => {
    ref1.current.style.transition = 'all 0s ease'
    ref1.current.style.opacity = '1'
    ref1.current.style.zIndex = '10'
    ref2.current.style.transition = 'all 0.5s ease'
    ref2.current.style.opacity = '1'
  }

  const hideViewer = (ref1, ref2) => {
    ref1.current.style.transition = 'all 0s ease'
    ref1.current.style.opacity = '0'
    ref2.current.style.transition = 'all 0.5s ease'
    ref2.current.style.opacity = '0'
    ref2.current.style.zIndex = '-1'
  }

  return {
    showSort,
    hideSort,
    showForm,
    hideForm,
    showMenu,
    hideMenu,
    showLogout,
    hideLogout,
    showPlayer,
    hidePlayer,
    showViewer,
    hideViewer
  }
}
