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
  sunIcon: <BsSun size={'23px'} />,
  moonIcon: <BsMoonStars size={'23px'} />,
  searchIcon: <BiSearch size={'23px'} />,
  login: <BiLogInCircle size={'23px'} />,
  user: <BiUserCircle size={'23px'} />,
  film: <GiFilmSpool size={'35px'} />,
  close: <MdOutlineClose size={'23px'} />,
  movie: <ImFilm size={'23px'} style={{ marginRight: '0.5rem' }} />,
  tv: <MdOutlineMonitor size={'23px'} style={{ marginRight: '0.5rem' }} />,
  star: <RiStarFill size={'20px'} />,
  next: <MdOutlineArrowForwardIos size={'20px'} />,
  prev: <MdOutlineArrowBackIosNew size={'20px'} />
}
