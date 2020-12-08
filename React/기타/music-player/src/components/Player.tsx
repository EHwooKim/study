import React, { useState, useRef, SetStateAction, Dispatch, useCallback  } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

import { SongDataType } from '../util'

type Props = {
  isPlaying: boolean,
  setIsPlaying: Dispatch<SetStateAction<boolean>>,
  currentSong: SongDataType
}
type SongInfoType = {
  currentTime: number,
  duration: number
}


const Player:React.FC<Props> = ({ isPlaying, setIsPlaying, currentSong: { audio }}) => {
  const [songInfo, setSongInfo] = useState<SongInfoType>({ 
    currentTime: 0,
    duration: 0,
  })
  const audioRef = useRef<HTMLAudioElement>(null)


  const playSongHandler = useCallback(() => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else { 
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying])
  
  const timeUpdateHandler = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const current = (e.target as HTMLAudioElement).currentTime
    const duration = (e.target as HTMLAudioElement).duration
    setSongInfo({
      ...songInfo, 
      currentTime: current,
      duration: duration
    })
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input type="range" />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={faPlay} />
        <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef} 
        src={audio}
      ></audio>
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