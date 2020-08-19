import React from 'react'

import Todo from '../Todo/Todo'
import Header from '../Header/Header'



function Home() {
  console.log('Home rendered')
  return (
    <>
      <Header/>
      <Todo />
    </>
  )
}

export default Home