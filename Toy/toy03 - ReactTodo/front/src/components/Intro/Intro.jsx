import React from 'react'
import './Intro.css'

import Header from '../Header/Header'
import SignupForm from './SignupForm/SignupForm'
import LoginForm from './LoginForm/LoginForm'


function Intro() {
  console.log('Intro rendered')

  return (
    <div className="intro-container">
      <Header userId={''}dispatch={() =>{}}/>
      <div id="intro-0">
        <fieldset>
          <legend>회원가입</legend>
          <SignupForm />
        </fieldset>
        <fieldset>
          <legend>로그인</legend>
          <LoginForm/>
        </fieldset>
      </div>
    </div>
  )
}

export default Intro