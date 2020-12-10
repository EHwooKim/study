import React, { Dispatch, SetStateAction } from 'react'

import { SongDataType } from '../util'

type Props = {
  audioRef: React.MutableRefObject<HTMLAudioElement>,
  songs: SongDataType[],
  song: SongDataType,
  setCurrentSong: Dispatch<SetStateAction<SongDataType>>,
  isPlaying: boolean
}

const LibrarySong:React.FC<Props> = ({ audioRef, songs, song, setCurrentSong, isPlaying }) => {

  const songSelectHandler = () => {
    setCurrentSong(song)
    if (isPlaying) {
      const playPromise = audioRef.current.play()
      console.log(playPromise)
      if (playPromise !== undefined) {
        playPromise.then(() => {
          audioRef.current.play()
        })
      }
    }
  }

  return (
    <div onClick={songSelectHandler} className="library-song">
      <img src={song.cover} alt={song.name}/>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  )
}

export default LibrarySong