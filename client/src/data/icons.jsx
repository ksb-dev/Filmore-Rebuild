import React from 'react'

// Recat Icons
import { BsSun, BsMoonStars } from 'react-icons/bs'
import { BiSearch, BiLogInCircle, BiUserCircle } from 'react-icons/bi'
import { GiFilmSpool } from 'react-icons/gi'
import {
  MdOutlineClose,
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
  MdOutlineMonitor
} from 'react-icons/md'
import { GrMonitor } from 'react-icons/gr'
import { ImFilm } from 'react-icons/im'
import { RiStarFill } from 'react-icons/ri'

export const iconsData = {
  sunIcon: <BsSun size={'20px'} />,
  moonIcon: <BsMoonStars size={'20px'} />,
  searchIcon: <BiSearch size={'20px'} />,
  login: <BiLogInCircle size={'20px'} />,
  user: <BiUserCircle size={'20px'} />,
  close: <MdOutlineClose size={'20px'} />,
  film: <GiFilmSpool size={'40px'} />,
  movie: <ImFilm size={'20px'} style={{ marginRight: '0.25rem' }} />,
  tv: <MdOutlineMonitor size={'20px'} style={{ marginRight: '0.25rem' }} />,
  star: <RiStarFill size={'20px'} />,
  next: <MdOutlineArrowForwardIos size={'20px'} />,
  prev: <MdOutlineArrowBackIosNew size={'20px'} />
}
