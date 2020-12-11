import React, { useState, useRef, SetStateAction, Dispatch, useCallback,   } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'

import { SongDataType } from '../util'
import { SongInfoType } from '../App'

type Props = {
  audioRef: React.MutableRefObject<HTMLAudioElement>,
  songInfo: SongInfoType
  setSongInfo: Dispatch<SetStateAction<SongInfoType>>
  isPlaying: boolean,
  setIsPlaying: Dispatch<SetStateAction<boolean>>,
  currentSong: SongDataType
}

const Player:React.FC<Props> = ({ audioRef ,isPlaying, setIsPlaying, songInfo, setSongInfo, currentSong }) => {
  console.log('player rendered')

  const playSongHandler = useCallback(() => {
    if (isPlaying) {
      audioRef.current.pause()
    } else { 
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const dragHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dragTime = parseInt(e.target.value);
    audioRef.current.currentTime = dragTime
    setSongInfo({
      ...songInfo,
      currentTime: dragTime
    })
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input 
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range" 
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
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