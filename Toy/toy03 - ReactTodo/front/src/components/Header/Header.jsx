import React from 'react'
import './Header.css'
import logo from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import api from '../../apis'
import { SET_USER } from '../../App'



function Header({ userId, dispatch }) {
  const history = useHistory()

  const logout = () => api.logout()
    .then(res => {
      dispatch({type: SET_USER, user: {
        id: 0,
        userId: '',
        githubId: '',
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
      {userId && <button onClick={logout}>로그아웃</button>}
    </header>
  )
}

export default Header
