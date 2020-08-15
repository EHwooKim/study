import React, { useState } from 'react'
import api from '../../../apis'


function SignupForm() {
  interface SignupInfo {
    userId: string,
    password: string,
    passwordCheck: string,
    githubId: string
  }

  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    userId: '',
    password: '',
    passwordCheck: '',
    githubId: ''    
  })
  const { userId, password, passwordCheck, githubId } = signupInfo

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    api.signup(signupInfo)
      .then(res => console.log(res))

    setSignupInfo({
      userId: '',
      password: '',
      passwordCheck: '',
      githubId: ''          
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
      <input type="text" name="userId" value={userId} onChange={onChange} placeholder="아이디"/>
      <input type="password" name="password" value={password} onChange={onChange} placeholder="비밀번호"/>
      <input type="password" name="passwordCheck" value={passwordCheck} onChange={onChange} placeholder="비밀번호 확인"/>
      <input type="text"name="githubId" value={githubId} onChange={onChange} placeholder="github ID"/>
      <button type="submit">회원가입</button>
  </form>
  )
}

export default SignupForm