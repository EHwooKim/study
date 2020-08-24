import React, { useState, useContext, useCallback, memo, useRef } from 'react'
import {useHistory} from 'react-router-dom'

import Input from './Input'
import api from '../../../apis'
import { SET_USER, UserContext } from '../../../App'


function LoginForm() {
  console.log('LoginForm rendered')

  const [loginInfo, setLoginInfo] = useState({
    userAccount: '',
    password: ''
  })
  const { dispatch } = useContext(UserContext)
  const history = useHistory()

  const formInfo = useRef([
    {
      type : "text",
      name : "userAccount",
      placeholder : "아이디",
    },
    {
      type : "password",
      name : "password",
      placeholder : "비밀번호",
    },
  ])


  const disabledCheck = useCallback(() => {
    return Object.values(loginInfo).some((v) => v.length < 1)
  }, [loginInfo])

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    console.log('로그인', loginInfo)
    // 로그인 로직
    api.login(loginInfo)
      .then(res => {
        // dispatch({type: SET_USER , user: res.data})
        api.getUser()
          .then(res => {
            // console.log(res)
            dispatch({type: SET_USER , user: res.data})
          })
        history.push('/home')
      })
      .catch((err) => {
        console.log('로그인 실패')
        console.log(err)
      })
  }, [loginInfo])

  const onChange = useCallback((name, value) => {
    setLoginInfo({
      ...loginInfo,
      [name]: value
    })
  }, [loginInfo])

  return (
    <form onSubmit={onSubmit}>
      {formInfo.current
        .map((v, i) =>
          <Input 
            key={i} 
            data={v} 
            value={loginInfo[v.name]} 
            onChange={onChange}
          />
      )}
      <button type="submit" disabled={disabledCheck()}>로그인</button>
    </form>
  )
}

export default memo(LoginForm)