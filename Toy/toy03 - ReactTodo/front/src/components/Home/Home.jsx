import React from 'react'

import './Home.css'
import Todo from '../Todo/Todo'
import Header from '../Header/Header'



function Home() {
  console.log('Home rendered')
  return (
    <>
      <Header/>
      <div className="home-content">
        <div></div>
        <Todo />
      </div>
    </>
  )
}

export default Home