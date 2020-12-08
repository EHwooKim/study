import React from 'react'

import { SongDataType } from '../util'

type Props = {
  currentSong: SongDataType
}

const Song:React.FC<Props> = ({ currentSong: { cover, name, artist } }) => {
  return (
    <div className="song-container">
      <img src={cover} />
      <h2>{name}</h2>
      <h3>{artist}</h3>
    </div>
  )
}

export default Song