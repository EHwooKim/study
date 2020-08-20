import React, { useState, useContext, useCallback, memo } from 'react'
import {useHistory} from 'react-router-dom'

import api from '../../../apis'
import { SET_USER } from '../../../App'
import { UserContext } from '../../../App'


function LoginForm() {
  console.log('LoginForm rendered')

  const [loginInfo, setLoginInfo] = useState({
    userAccount: '',
    password: ''
  })
  const { userAccount, password } = loginInfo
  const { dispatch } = useContext(UserContext)

  const history = useHistory()
  const onSubmit = useCallback((e) => {
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
  }, [loginInfo])

  const onChange = useCallback((e) => {
    const { name, value } = e.target
    setLoginInfo({
      ...loginInfo,
      [name]: value
    })
  }, [loginInfo])

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="userAccount" value={userAccount} onChange={onChange} placeholder="아이디"/>
      <input type="password" name="password" value={password} onChange={onChange} placeholder="비밀번호"/>
      <button type="submit">로그인</button>
    </form>
  )
}

export default memo(LoginForm)