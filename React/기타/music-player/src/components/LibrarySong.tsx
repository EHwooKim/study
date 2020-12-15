import React, { Dispatch, SetStateAction, memo } from 'react'

import { SongDataType } from '../data'

type Props = {
  audioRef: React.MutableRefObject<HTMLAudioElement>,
  songs: SongDataType[],
  setSongs: Dispatch<React.SetStateAction<SongDataType[]>>,
  song: SongDataType,
  setCurrentSong: Dispatch<SetStateAction<SongDataType>>,
  isPlaying: boolean
}

const LibrarySong:React.FC<Props> = ({ audioRef, songs, setSongs, song, setCurrentSong, isPlaying }) => {
  const songSelectHandler = async () => {
    setCurrentSong(song)
    const newSongs = songs.map((s) => {
      if (s.id === song.id) {
        return {
          ...s,
          active: true
        }
      } else {
        return {
          ...s,
          active: false
        }
      }
    })
    await setSongs(newSongs)
    if (isPlaying) audioRef.current.play()
  }

  return (
    <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected': ''}`}>
      <img src={song.cover} alt={song.name}/>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  )
}

export default memo(LibrarySong)