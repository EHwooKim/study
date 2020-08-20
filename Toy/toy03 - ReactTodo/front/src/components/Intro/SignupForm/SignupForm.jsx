import React, { useState, useCallback, memo } from 'react'
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
  const { userAccount, password, passwordCheck, githubAccount } = signupInfo

  const onChange = useCallback((e) => {
    const { name, value } = e.target
    setSignupInfo({
      ...signupInfo,
      [name]: value
    })
  }, [signupInfo])

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    api.signup(signupInfo)
      .then(res => console.log(res))

    setSignupInfo({
      userAccount: '',
      password: '',
      passwordCheck: '',
      githubAccount: ''          
    })
  }, [signupInfo])

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="userAccount" value={userAccount} onChange={onChange} placeholder="아이디"/>
      <input type="password" name="password" value={password} onChange={onChange} placeholder="비밀번호"/>
      <input type="password" name="passwordCheck" value={passwordCheck} onChange={onChange} placeholder="비밀번호 확인"/>
      <input type="text" name="githubAccount" value={githubAccount} onChange={onChange} placeholder="github ID"/>
      <button type="submit">회원가입</button>
  </form>
  )
}

export default memo(SignupForm)