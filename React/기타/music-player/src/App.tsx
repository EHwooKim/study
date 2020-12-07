import React from 'react';
import './styles/app.scss'

import Song from './components/Song'
import Player from './components/Player'

import data from './util'


const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Music player!</h1>
      <Song />
      <Player />
    </div>
  )
}

export default App;
