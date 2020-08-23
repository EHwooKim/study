import React from 'react'

import './Home.css'
import Header from '../Header/Header'
import Todo from '../Todo/Todo'
import TodoSide from '../TodoSide/TodoSide'



function Home() {
  console.log('Home rendered')
  return (
    <>
      <Header/>
      <div className="home-content">
        <div></div>
        <Todo />
        <TodoSide />
      </div>
    </>
  )
}

export default Home