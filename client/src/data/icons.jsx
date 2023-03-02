import React from 'react'

// Recat Icons
import {
  AiOutlinePlus,
  AiOutlineCheck,
  AiOutlineHome,
  AiOutlineStar,
  AiTwotoneHome,
  AiFillHome
} from 'react-icons/ai'
import {
  BsSun,
  BsMoonStars,
  BsEye,
  BsEyeSlash,
  BsCheckCircle,
  BsPlayCircle,
  BsCheck2,
  BsPlusCircleFill
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
import {
  RiStarFill,
  RiLoginCircleFill,
  RiLoginCircleLine,
  RiStarLine,
  RiBookmark3Line
} from 'react-icons/ri'
import { FaWindowClose } from 'react-icons/fa'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { FiCheck, FiCheckCircle } from 'react-icons/fi'

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
  starOutlined: <RiStarLine size={'20px'} />,
  starFilled: <RiStarFill size={'20px'} />,
  homeOutlined: <AiOutlineHome size={'20px'} />,
  homeFilled: <AiFillHome size={'20px'} />,
  loginOutlined: <RiLoginCircleLine size={'20px'} />,
  loginFilled: <RiLoginCircleFill size={'20px'} />,

  addBookmark: <AiOutlinePlus size={'20px'} />,
  addedBookmark: <FiCheck size={'20px'} />,
  addBookmark1: <AiOutlinePlus size={'25px'} />,
  addedBookmark1: <FiCheck size={'25px'} />,
  filledBookmark: <BsPlusCircleFill size={'20px'} />,
  star1: <RiStarFill size={'20px'} style={{ marginRight: '0.5rem' }} />,
  star2: <AiOutlineStar size={'20px'} />,
  next: <MdOutlineArrowForwardIos size={'20px'} />,
  prev: <MdOutlineArrowBackIosNew size={'20px'} />,
  menu: <TfiMenu size={'20px'} style={{ marginRight: '0.5rem' }} />,
  back: <BiArrowBack size={'20px'} style={{ marginRight: '0.5rem' }} />,
  eyeOpen: <BsEye />,
  eyeClose: <BsEyeSlash />,
  watchlist: <BsCheckCircle size={'20px'} />,
  forwardArrow: (
    <IoChevronForwardOutline size={'30px'} style={{ margin: '0.5rem 0 0 0' }} />
  ),
  play: <BsPlayCircle size={'20px'} style={{ marginRight: '0.5rem' }} />
}
