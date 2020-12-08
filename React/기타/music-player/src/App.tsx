import React, { useState } from 'react';
import './styles/app.scss'

import Song from './components/Song'
import Player from './components/Player'

import data from './util'

import { SongDataType } from './util'

const App: React.FC = () => {
  const [songs, setSongs] = useState<SongDataType[]>(data())
  const [currentSong, setCurrentSong] = useState<SongDataType>(songs[0])
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} />
    </div>
  )
}

export default App;
