import React, { useState, useRef } from 'react';
import './styles/app.scss'

import Song from './components/Song'
import Player from './components/Player'
import Library from './components/Library'

import data, { SongDataType } from './util'

export type SongInfoType = {
  currentTime: number,
  duration: number
}

const App: React.FC = () => {
  const [songs, setSongs] = useState<SongDataType[]>(data())
  const [currentSong, setCurrentSong] = useState<SongDataType>(songs[0])
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [songInfo, setSongInfo] = useState<SongInfoType>({ 
    currentTime: 0,
    duration: 0,
  })

  const audioRef = useRef<HTMLAudioElement>(new Audio(''))

  const timeUpdateHandler = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const current = (e.target as HTMLAudioElement).currentTime
    const duration = (e.target as HTMLAudioElement).duration
    setSongInfo({
      currentTime: current,
      duration: duration
    })
  }

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player 
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        currentSong={currentSong} 
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef} 
        src={currentSong.audio}
      ></audio>
      <Library 
        audioRef={audioRef}
        songs={songs} 
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
      />
    </div>
  )
}

export default App;
