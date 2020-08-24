import React, { useReducer, useEffect, createContext, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import api from './apis'
import './App.css';

import Intro from './components/Intro/Intro'
import Home from './components/Home/Home'

export const UserContext = createContext({
  id: 0,
  userAccount: '',
  githubAccount: '',
  isAdmin: false,
  Followers: [],
  Followings: [],
  dispatch: () => {}
})

const initialState = {
  id: 0,
  userAccount: '',
  githubAccount: '',
  isAdmin: false,
  Followers: [],
  Followings: [],
}

export const SET_USER = 'SET_USER'

function reducer(state, action) {
  switch (action.type) {
    case SET_USER: 
      return {
        ...action.user
      }
    default:
      throw new Error()
  }
}

function App() {
  console.log('App rendered')

  const [state, dispatch] = useReducer(reducer, initialState) // user state
  const { id, userAccount, githubAccount, isAdmin, Followers, Followings } = state
  console.log(state)
  const value = useMemo(() => ({ id, userAccount, githubAccount, isAdmin, dispatch, Followers, Followings }), [id])
  
  useEffect(() => {
    api.getUser()
    .then(res => {
      console.log(res)
      dispatch({type: SET_USER , user: res.data})
    })
    .catch(() => {})
  }, [])

  return (
    <UserContext.Provider value = {value}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={() => <Intro dispatch={dispatch}/>}></Route>
            <Route path="/home" component={Home}></Route>
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
 