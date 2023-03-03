import React from 'react'

// Recat Icons
import { AiOutlinePlus, AiOutlineHome, AiFillHome } from 'react-icons/ai'
import {
  BsSun,
  BsMoonStars,
  BsEye,
  BsEyeSlash,
  BsPlayCircle,
  BsPlusCircle,
  BsPlusCircleFill
} from 'react-icons/bs'
import { BiSearch, BiUserCircle } from 'react-icons/bi'

import {
  MdOutlineClose,
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos
} from 'react-icons/md'
import { TfiMenu } from 'react-icons/tfi'
import { RiLoginCircleFill, RiLoginCircleLine } from 'react-icons/ri'
import { FiCheck } from 'react-icons/fi'

export const iconsData = {
  // Header Icons
  homeOutlined: <AiOutlineHome size={'20px'} />,
  homeFilled: <AiFillHome size={'20px'} />,
  outlineBookmark: <BsPlusCircle size={'19px'} />,
  filledBookmark: <BsPlusCircleFill size={'19px'} />,
  loginOutlined: <RiLoginCircleLine size={'20px'} />,
  loginFilled: <RiLoginCircleFill size={'20px'} />,
  sunIcon: <BsSun size={'20px'} />,
  moonIcon: <BsMoonStars size={'20px'} />,
  searchIcon: <BiSearch size={'20px'} />,
  user: <BiUserCircle size={'20px'} />,

  close: <MdOutlineClose size={'20px'} />,
  close1: <MdOutlineClose size={'25px'} />,

  addBookmark: <AiOutlinePlus size={'20px'} />,
  addedBookmark: <FiCheck size={'20px'} />,
  addBookmark1: <AiOutlinePlus size={'25px'} />,
  addedBookmark1: <FiCheck size={'25px'} />,

  next: <MdOutlineArrowForwardIos size={'20px'} />,
  prev: <MdOutlineArrowBackIosNew size={'20px'} />,

  menu: <TfiMenu size={'20px'} style={{ marginRight: '0.5rem' }} />,

  eyeOpen: <BsEye />,
  eyeClose: <BsEyeSlash />,

  play: <BsPlayCircle size={'20px'} style={{ marginRight: '0.5rem' }} />,

  forwardArrow: (
    <MdOutlineArrowForwardIos
      size={'20px'}
      style={{ marginBottom: '-0.1rem' }}
    />
  )
}
