import React from 'react'

import Todo from '../Todo/Todo'
import Header from '../Header/Header'



function Home({state, dispatch}) {

  return (
    <>
      <Header userId={state.userAccount} dispatch={dispatch}/>
      <Todo id={state.id}/>
    </>
  )
}

export default Home