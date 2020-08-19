import React, { useReducer, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import api from './apis'

import Intro from './components/Intro/Intro'
import Home from './components/Home/Home'


const initialState = {
  id: 0,
  userAccount: '',
  githubId: '',
  isAdmin: false
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
  const [state, dispatch] = useReducer(reducer, initialState)
  
  useEffect(() => {
    api.getUser()
    .then(res => {
      dispatch({type: SET_USER , user: res.data})
    })
    .catch(() => {})
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={() => <Intro dispatch={dispatch}/>}></Route>
          <Route path="/home" component={() => <Home state={state} dispatch={dispatch} />}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
 