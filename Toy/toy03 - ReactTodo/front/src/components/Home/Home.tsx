import React from 'react'

import Todo from '../Todo/Todo'
import Header from '../Header/Header'

interface propsType {
  state: {
    id: number,
    userAccount: string,
    githubId: string,
    isAdmin: boolean
  },
  dispatch: ({}:any) => void
}

function Home({state, dispatch}: propsType) {

  return (
    <>
      <Header userId={state.userAccount} dispatch={dispatch}/>
      <Todo id={state.id}/>
    </>
  )
}

export default Home