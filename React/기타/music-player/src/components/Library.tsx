import React from 'react'
import LibrarySong from './LibrarySong'

import { SongDataType } from '../util'

type Props = {
  songs: SongDataType[]
}

const Library: React.FC<Props> = ({ songs }) => {
  return (
    <div className="library">
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map(song => <LibrarySong currentSong={song} />)}
      </div>
    </div>
  )
}

export default Library