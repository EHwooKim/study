import React from 'react';
// import Game from './ClassComponents/Game'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Game from './HooksComponents/Game'
import Home from './HooksComponents/Home'


class App extends React.Component {

  render() {
    return (
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/game">Game</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

      </Router>
    )
  }
}

export default App
