import React from 'react'
import './Header.css'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import api from '../../apis'

import Watch from '../Watch/Watch'

const Header = () => {

  const logout = () => api.logout().then(res => console.log(res))

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <span>
        React Todo
      </span>
      <small><Link to="/home">일단 투두로 들어가기</Link></small>
      <button onClick={logout}>로그아웃</button>
      <Watch />
    </header>
  )
}

export default Header
