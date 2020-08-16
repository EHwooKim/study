import React, { useState } from 'react'
import api from '../../../apis'


function SignupForm() {
  interface SignupInfo {
    userAccount: string,
    password: string,
    passwordCheck: string,
    githubAccount: string
  }

  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    userAccount: '',
    password: '',
    passwordCheck: '',
    githubAccount: ''    
  })
  const { userAccount, password, passwordCheck, githubAccount } = signupInfo

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    api.signup(signupInfo)
      .then(res => console.log(res))

    setSignupInfo({
      userAccount: '',
      password: '',
      passwordCheck: '',
      githubAccount: ''          
    })
  }

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignupInfo({
      ...signupInfo,
      [name]: value
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="userAccount" value={userAccount} onChange={onChange} placeholder="아이디"/>
      <input type="password" name="password" value={password} onChange={onChange} placeholder="비밀번호"/>
      <input type="password" name="passwordCheck" value={passwordCheck} onChange={onChange} placeholder="비밀번호 확인"/>
      <input type="text"name="githubAccount" value={githubAccount} onChange={onChange} placeholder="github ID"/>
      <button type="submit">회원가입</button>
  </form>
  )
}

export default SignupForm