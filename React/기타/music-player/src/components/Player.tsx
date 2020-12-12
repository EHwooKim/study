import React, { SetStateAction, Dispatch, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'

import { SongDataType } from '../util'
import { SongInfoType } from '../App'

type Props = {
  audioRef: React.MutableRefObject<HTMLAudioElement>,
  songs: SongDataType[],
  setSongs: Dispatch<SetStateAction<SongDataType[]>>,
  songInfo: SongInfoType
  setSongInfo: Dispatch<SetStateAction<SongInfoType>>
  isPlaying: boolean,
  setIsPlaying: Dispatch<SetStateAction<boolean>>,
  currentSong: SongDataType
  setCurrentSong: Dispatch<SetStateAction<SongDataType>>,
}

const Player:React.FC<Props> = ({ audioRef, songs, setSongs, isPlaying, setIsPlaying, songInfo, setSongInfo, currentSong, setCurrentSong }) => {
  useEffect(() => {
    const newSongs = songs.map((s) => {
      if (s.id === currentSong.id) {
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
    setSongs(newSongs)
  }, [currentSong])

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else { 
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const dragHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dragTime = parseInt(e.target.value);
    audioRef.current.currentTime = dragTime
    setSongInfo({
      ...songInfo,
      currentTime: dragTime
    })
  }

  const skipTrackHandler = (direction: string) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    if (direction === 'skip-forward') {
      setCurrentSong(songs[(currentIndex + 1) % songs.length])
    } 
    if (direction === 'skip-back') {
      if (currentIndex === 0) {
        setCurrentSong(songs[songs.length - 1])
        return 
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length])
    }
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input 
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range" 
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className="skip-forward" size="2x" icon={faAngleRight} />
      </div>
    </div>
  )
}


const zeroFill = (num:number): string => num < 10 ? `0${num}` : `${num}`
const getTime = (time: number): string => {
  return (
    `${zeroFill(Math.floor(time / 60))}:${zeroFill(Math.floor(time % 60))}`
  )
}


export default Player