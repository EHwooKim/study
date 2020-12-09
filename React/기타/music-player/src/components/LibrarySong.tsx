import React from 'react'

import { SongDataType } from '../util'

type Props = {
  currentSong: SongDataType
}

const LibrarySong:React.FC<Props> = ({ currentSong: { cover, name, artist } }) => {
  return (
    <div className="library-song">
      <img src={cover} alt={name}/>
      <div className="song-description">
        <h3>{name}</h3>
        <h4>{artist}</h4>
      </div>
    </div>
  )
}

export default LibrarySong