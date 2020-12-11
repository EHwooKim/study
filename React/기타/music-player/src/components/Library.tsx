import React, { Dispatch, SetStateAction, memo } from 'react'
import LibrarySong from './LibrarySong'

import { SongDataType } from '../util'

type Props = {
  libraryStatus: boolean,
  audioRef: React.MutableRefObject<HTMLAudioElement>,
  songs: SongDataType[],
  setSongs: Dispatch<React.SetStateAction<SongDataType[]>>,
  setCurrentSong: Dispatch<SetStateAction<SongDataType>>,
  isPlaying: boolean
}

const Library: React.FC<Props> = ({ libraryStatus, audioRef, songs, setSongs, setCurrentSong, isPlaying }) => {
  return (
    <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map(song => (
          <LibrarySong 
            songs={songs}
            setSongs={setSongs}
            setCurrentSong={setCurrentSong} 
            song={song}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(Library)