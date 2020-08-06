import React from 'react'
import './Header.css'
import logo from '../../assets/logo.svg'

const Header = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <span>
        React Todo
      </span>
    </header>
  )
}

export default Header
