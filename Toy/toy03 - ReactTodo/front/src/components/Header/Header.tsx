import React from 'react'
import './Header.css'
import logo from '../../assets/logo.svg'

import Watch from '../Watch/Watch'

const Header = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <span>
        React Todo
      </span>
      <Watch />
    </header>
  )
}

export default Header
