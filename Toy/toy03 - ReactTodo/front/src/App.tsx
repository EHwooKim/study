import React, { useReducer } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Intro from './components/Intro/Intro'
import Home from './components/Home/Home'

type User = {
  id: string,
  userId: string,
  githubId: string,
  isAdmin: boolean
}

type Action = { type: 'SET_USER', user: User }

const initialState:User = {
  id: '',
  userId: '',
  githubId: '',
  isAdmin: false
}

export const SET_USER = 'SET_USER'

function reducer(state: User, action: Action) {
  switch (action.type) {
    case SET_USER: 
      return {
        ...action.user
      }
    default:
      throw new Error()
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="App">
      <div>{state.userId}</div>
      <Router>
        <Switch>
          <Route exact path="/" component={() => <Intro dispatch={dispatch}/>}></Route>
          <Route path="/home" component={Home}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
 