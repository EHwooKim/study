import React, { useState } from 'react'
import api from '../../../apis'
import { SET_USER } from '../../../App'
import {useHistory} from 'react-router-dom'


function LoginForm({ dispatch }) {
  const [loginInfo, setLoginInfo] = useState({
    userAccount: '',
    password: ''
  })
  const { userAccount, password } = loginInfo

  const history = useHistory()
  const onSubmit = (e) => {
    e.preventDefault()
    console.log('로그인')
    // 로그인 로직
    api.login(loginInfo)
      .then(res => {
        dispatch({type: SET_USER , user: res.data})
        history.push('/home')
      })
    setLoginInfo({
      userAccount:'',
      password: ''
    })
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setLoginInfo({
      ...loginInfo,
      [name]: value
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="userAccount" value={userAccount} onChange={onChange} placeholder="아이디"/>
      <input type="password" name="password" value={password} onChange={onChange} placeholder="비밀번호"/>
      <button type="submit">로그인</button>
    </form>
  )
}

export default LoginForm