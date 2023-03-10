import React from 'react'

// Recat Icons
import {
  AiOutlinePlus,
  AiOutlineHome,
  AiFillHome,
  AiFillCaretDown
} from 'react-icons/ai'
import {
  BsSun,
  BsMoonStars,
  BsEye,
  BsEyeSlash,
  BsPlayCircle,
  BsPlusCircle,
  BsPlusCircleFill,
  BsArrowRightCircle,
  BsImages,
  BsPlay
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
import { IoPersonCircle } from 'react-icons/io5'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { ImImage } from 'react-icons/im'

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
  close2: (
    <MdOutlineClose
      size={'20px'}
      style={{
        margin: '0rem 0.5rem 0 0',
        background: 'var(--red)',
        color: '#fff',
        borderRadius: '50%',
        padding: '0.15rem'
      }}
    />
  ),

  addBookmark: (
    <AiOutlinePlus size={'15px'} style={{ marginBottom: '0.05rem' }} />
  ),
  addedBookmark: <FiCheck size={'15px'} />,
  addBookmark1: <AiOutlinePlus size={'25px'} />,
  addedBookmark1: <FiCheck size={'25px'} />,

  next: <MdOutlineArrowForwardIos size={'20px'} />,
  prev: <MdOutlineArrowBackIosNew size={'20px'} />,

  menu: <TfiMenu size={'20px'} style={{ marginRight: '0.5rem' }} />,

  eyeOpen: <BsEye />,
  eyeClose: <BsEyeSlash />,

  play: <BsPlayCircle size={'20px'} style={{ marginRight: '0.25rem' }} />,
  play1: <BsPlay size={'17.5px'} style={{ margin: '0.2rem 0 0 0.15rem' }} />,

  forwardArrow: (
    <MdOutlineArrowForwardIos
      size={'20px'}
      style={{ marginBottom: '-0.15rem' }}
    />
  ),

  down: <AiFillCaretDown size={'20px'} style={{ marginTop: '0.25rem' }} />,
  rightCircle: (
    <BsArrowRightCircle size={'20px'} style={{ marginLeft: '0.25rem' }} />
  ),

  person: <IoPersonCircle size={'50px'} />,

  forward: (
    <IoIosArrowRoundForward size={'20px'} style={{ marginTop: '0.2rem' }} />
  ),

  imageIcon: <BsImages size={'25px'} />
}
