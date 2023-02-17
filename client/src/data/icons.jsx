import React from 'react'

// Recat Icons
import {
  AiOutlinePlus,
  AiOutlineCheck,
  AiFillCloseCircle
} from 'react-icons/ai'
import {
  BsSun,
  BsMoonStars,
  BsEye,
  BsEyeSlash,
  BsCheckCircle
} from 'react-icons/bs'
import {
  BiSearch,
  BiLogInCircle,
  BiLogOutCircle,
  BiUserCircle,
  BiArrowBack
} from 'react-icons/bi'
import { GiFilmSpool } from 'react-icons/gi'
import {
  MdOutlineClose,
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
  MdOutlineMonitor
} from 'react-icons/md'
import { TfiMenu } from 'react-icons/tfi'
import { ImFilm } from 'react-icons/im'
import { RiStarFill } from 'react-icons/ri'
import { TfiHome } from 'react-icons/tfi'
import { FaWindowClose } from 'react-icons/fa'

export const iconsData = {
  sunIcon: <BsSun size={'20px'} />,
  moonIcon: <BsMoonStars size={'20px'} />,
  searchIcon: <BiSearch size={'20px'} />,
  login: <BiLogInCircle size={'20px'} />,
  logout: <BiLogOutCircle size={'20px'} style={{ marginRight: '0.25rem' }} />,
  user: <BiUserCircle size={'20px'} />,
  user1: <BiUserCircle size={'20px'} style={{ marginRight: '0.25rem' }} />,
  close: <MdOutlineClose size={'20px'} />,
  close1: <MdOutlineClose size={'25px'} />,
  close2: <FaWindowClose size={'20px'} />,
  film: <GiFilmSpool size={'40px'} />,
  movie: <ImFilm size={'20px'} style={{ marginRight: '0.25rem' }} />,
  tv: <MdOutlineMonitor size={'20px'} style={{ marginRight: '0.25rem' }} />,
  movie1: (
    <ImFilm size={'20px'} style={{ marginRight: '0.5rem', color: '#fff' }} />
  ),
  tv1: (
    <MdOutlineMonitor
      size={'20px'}
      style={{ marginRight: '0.5rem', color: '#fff' }}
    />
  ),
  star: <RiStarFill size={'20px'} />,
  star1: <RiStarFill size={'20px'} style={{ marginRight: '0.5rem' }} />,
  next: <MdOutlineArrowForwardIos size={'20px'} />,
  prev: <MdOutlineArrowBackIosNew size={'20px'} />,
  menu: <TfiMenu size={'20px'} style={{ marginRight: '0.5rem' }} />,
  back: <BiArrowBack size={'20px'} style={{ marginRight: '0.5rem' }} />,
  eyeOpen: <BsEye />,
  eyeClose: <BsEyeSlash />,
  home: <TfiHome size={'20px'} />,
  watchlist: <BsCheckCircle size={'20px'} />,
  addBookmark: <AiOutlinePlus size={'20px'} />,
  deleteBookmark: <AiOutlineCheck size={'20px'} />
}
