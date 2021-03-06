import React, { useState, useRef } from 'react';
import './styles/app.scss'

import Song from './components/Song'
import Player from './components/Player'
import Library from './components/Library'
import Nav from './components/Nav'


import data, { SongDataType } from './data'

export type SongInfoType = {
  currentTime: number,
  duration: number,
  animationPercentage: number
}

const App: React.FC = () => {
  const [songs, setSongs] = useState<SongDataType[]>(data())
  const [currentSong, setCurrentSong] = useState<SongDataType>(songs[0])
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [songInfo, setSongInfo] = useState<SongInfoType>({ 
    currentTime: 0,
    duration: 0,
    animationPercentage: 0
  })
  const [libraryStatus, setLibraryStatus] = useState<boolean>(false)

  const audioRef = useRef<HTMLAudioElement>(new Audio(''))

  const timeUpdateHandler = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const current = (e.target as HTMLAudioElement).currentTime
    const duration = (e.target as HTMLAudioElement).duration
    const roundedCurrent = Math.round(current)
    const roundedDuration = Math.round(duration)
    const animationPercentage = Math.round((roundedCurrent/roundedDuration) * 100)
    setSongInfo({
      currentTime: current,
      duration: duration,
      animationPercentage: animationPercentage
    })
  }

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    await setCurrentSong(songs[(currentIndex + 1) % songs.length])
    if (isPlaying) audioRef.current.play()
  }

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav 
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <Song 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        />
      <Player 
        audioRef={audioRef}
        songs={songs} 
        setSongs={setSongs}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        currentSong={currentSong} 
        setCurrentSong={setCurrentSong}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef} 
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
      <Library 
        libraryStatus={libraryStatus}
        audioRef={audioRef}
        songs={songs} 
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
      />
    </div>
  )
}

export default App;
