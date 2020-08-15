import React, { useState } from 'react'
import api from '../../../apis'

interface propsType {
  dispatch: ({}:any) => void
}

function LoginForm({ dispatch }: propsType) {
  interface LoginInfo {
    userId: string,
    password: string
  }

  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    userId: '',
    password: ''
  })
  const { userId, password } = loginInfo

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('로그인')
    // 로그인 로직
    api.login(loginInfo)
      .then(res => console.log(res.data))
    setLoginInfo({
      userId:'',
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
      <input type="text" name="userId" value={userId} onChange={onChange} placeholder="아이디"/>
      <input type="password" name="password" value={password} onChange={onChange} placeholder="비밀번호"/>
      <button type="submit">로그인</button>
    </form>
  )
}

export default LoginForm