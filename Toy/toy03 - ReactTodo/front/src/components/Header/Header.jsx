import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

import logo from '../../assets/logo.svg'
import './Header.css'

import api from '../../apis'
import { SET_USER } from '../../App'
import { UserContext } from '../../App'



function Header() {
  console.log('Header rendered')
  const history = useHistory()
  const { userAccount, dispatch } = useContext(UserContext)

  const logout = () => api.logout()
    .then(res => {
      dispatch({type: SET_USER, user: {
        id: 0,
        userAccount: '',
        githubAccdount: '',
        isAdmin: false
      }})
      history.push('/')
    })

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <span>
        React Todo
      </span>
      <small><Link to="/home">일단 투두로 들어가기</Link></small>
      {userAccount && <button onClick={logout}>로그아웃</button>}
    </header>
  )
}

export default Header
