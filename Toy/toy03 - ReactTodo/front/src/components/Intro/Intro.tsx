import React from 'react'
import './Intro.css'

import { Link } from 'react-router-dom'

import Header from '../Header/Header'
import SignupForm from './SignupForm/SignupForm'
import LoginForm from './LoginForm/LoginForm'

function Intro() {


  return (
    <div className="intro-container">
      <Header />
      <div>
        <Link to="/home">일단 투두로 들어가기</Link>
        <SignupForm />
        <LoginForm />
      </div>
    </div>
  )
}

export default Intro