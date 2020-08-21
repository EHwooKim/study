import React, { useContext, useCallback, memo } from 'react'
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

  const logout = useCallback(() => api.logout()
    .then(res => {
      dispatch({type: SET_USER, user: {
        id: 0,
        userAccount: '',
        githubAccdount: '',
        isAdmin: false
      }})
      history.push('/')
    }), [])

  return (
    <header className="App-header">
      <span>
        <img src={logo} className="App-logo" alt="logo" />
        <span>
          React Todo
        </span>
      </span>
      {userAccount && <button class="logout-btn"onClick={logout}>{userAccount}<small>(logout)</small></button>}
    </header>
  )
}

export default memo(Header)
