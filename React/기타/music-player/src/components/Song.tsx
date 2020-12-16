import React from 'react'

import { SongDataType } from '../data'

type Props = {
  currentSong: SongDataType,
  isPlaying: boolean
}

const Song:React.FC<Props> = ({ currentSong: { cover, name, artist }, isPlaying}) => {
  return (
    <div className="song-container">
      <img src={cover} alt={name} className={isPlaying ? 'playing' : ''}/>
      <h2>{name}</h2>
      <h3>{artist}</h3>
    </div>
  )
}

export default Song