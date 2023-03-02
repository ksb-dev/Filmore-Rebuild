import React, { useEffect } from 'react'

// Context
import { useMovieContext } from '../../context/context'

// Hooks
import { useShowHide } from '../../hooks/useShowHide'

// Components
import Loading from '../../other/Loading/Loading'
import Iframe from '../../other/Iframe/Iframe'

const PlayerOne = ({
  playerRef,
  playerInnerRef,
  playerUrl,
  playerLoading,
  setPlayerUrl
}) => {
  const { mode } = useMovieContext()
  const { hidePlayer } = useShowHide()

  useEffect(() => {}, [playerUrl])

  // Detect outside click of Side Menu
  useEffect(() => {
    const handleOutsideClick = e => {
      if (
        playerRef.current !== null &&
        playerRef.current.contains(e.target) &&
        !playerInnerRef.current.contains(e.target)
      ) {
        hidePlayer(playerInnerRef, playerRef)
        setPlayerUrl('')
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => document.removeEventListener('click', handleOutsideClick)
  }, [playerRef, playerInnerRef])

  return (
    <div
      ref={playerRef}
      className={'player ' + (mode === true ? 'lightAlpha1' : 'darkAlpha1')}
    >
      <div
        ref={playerInnerRef}
        className={'player__inner ' + (mode === true ? 'lightBg2' : 'darkBg1')}
      >
        {playerLoading && (
          <div className='player__inner__loading'>
            <Loading />
          </div>
        )}

        {!playerLoading && playerUrl && <Iframe embedId={playerUrl} />}

        {!playerLoading && !playerUrl && <h1>Trailer not found.</h1>}
      </div>
    </div>
  )
}

export default PlayerOne
