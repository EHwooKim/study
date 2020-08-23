import React, { useState, useCallback, memo, useRef } from 'react'

import Input from '../LoginForm/Input'
import api from '../../../apis'
import { sign } from 'crypto'


function SignupForm() {
  console.log('SignupForm rendered')

  const [signupInfo, setSignupInfo] = useState({
    userAccount: '',
    password: '',
    passwordCheck: '',
    githubAccount: ''    
  })

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
    {
      type : "password",
      name : "passwordCheck",
      placeholder : "비밀번호 확인",
    },
    {
      type : "text",
      name : "githubAccount",
      placeholder : "github ID",
    },
  ])

  const disabledCheck = useCallback(() => {
    return Object.values(signupInfo).some((v) => v.length < 1)
  }, [signupInfo])

  const onChange = useCallback((name, value) => {
    setSignupInfo({
      ...signupInfo,
      [name]: value
    })
  }, [signupInfo])

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    api.signup(signupInfo)
      .then(res => {
        console.log(res)
        setSignupInfo({
          userAccount: '',
          password: '',
          passwordCheck: '',
          githubAccount: ''          
        })
      })
      .catch(err => {
        console.log('회원가입 실패')
        console.error(err)
      })
  }, [signupInfo])

  return (
    <form onSubmit={onSubmit}>
      {formInfo.current
        .map((v, i) => 
          <Input 
            key={i}
            data={v} 
            value={signupInfo[v.name]} 
            onChange={onChange}
          />
      )}
      <button type="submit" disabled={disabledCheck()}>회원가입</button>
  </form>
  )
}

export default memo(SignupForm)