import React, { useState } from 'react'

function LoginForm() {
  interface ILoginInfo {
    userid: string,
    password: string
  }

  const [loginInfo, setLoginInfo] = useState({
    userid: '',
    password: ''
  })
  const { userid, password } = loginInfo

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('로그인')
    // 로그인 로직
    setLoginInfo({
      userid:'',
      password: ''
    })
  }

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginInfo({
      ...loginInfo,
      [name]: value
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="userid" value={userid} onChange={onChange} placeholder="아이디"/>
      <input type="password" name="password" value={password} onChange={onChange} placeholder="비밀번호"/>
      <button type="submit">로그인</button>
    </form>
  )
}

export default LoginForm