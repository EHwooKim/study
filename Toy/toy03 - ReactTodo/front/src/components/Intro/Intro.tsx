import React from 'react'
import './Intro.css'

import { Link } from 'react-router-dom'

import Header from '../Header/Header'
import SignupForm from './SignupForm/SignupForm'
import LoginForm from './LoginForm/LoginForm'

import api from '../../apis'

import {SET_USER} from '../../App'

interface propsType {
  dispatch: ({}:any) => void
}

function Intro({ dispatch }: propsType) {


  return (
    <div className="intro-container">
      <Header userId={''}dispatch={() =>{}}/>
      <div id="intro-0">
        <fieldset>
          <legend>회원가입</legend>
          <SignupForm />
        </fieldset>
        <fieldset>
          <legend>로그인  </legend>
          <LoginForm dispatch={dispatch} />
        </fieldset>
      </div>
    </div>
  )
}

export default Intro