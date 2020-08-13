import React, { useState } from 'react'

function SignupForm() {
  interface SignupInfo {
    userid: string,
    password: string,
    passwordCheck: string,
    githubid: string
  }

  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    userid: '',
    password: '',
    passwordCheck: '',
    githubid: ''    
  })
  const { userid, password, passwordCheck, githubid } = signupInfo

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('회원가입')
    // 회원가입 로직
    setSignupInfo({
      userid: '',
      password: '',
      passwordCheck: '',
      githubid: ''          
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
      <input type="text" name="userid" value={userid} onChange={onChange} placeholder="아이디"/>
      <input type="password" name="password" value={password} onChange={onChange} placeholder="비밀번호"/>
      <input type="password" name="passwordCheck" value={passwordCheck} onChange={onChange} placeholder="비밀번호 확인"/>
      <input type="text"name="githubid" value={githubid} onChange={onChange} placeholder="github ID"/>
      <button type="submit">회원가입</button>
  </form>
  )
}

export default SignupForm