import React, { useRef, SetStateAction, Dispatch  } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

import { SongDataType } from '../util'

type Props = {
  isPlaying: boolean,
  setIsPlaying: Dispatch<SetStateAction<boolean>>,
  currentSong: SongDataType
}

const Player:React.FC<Props> = ({ isPlaying, setIsPlaying, currentSong: { audio }}) => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else { 
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>Start Time</p>
        <input type="range" />
        <p>End Time</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={faPlay} />
        <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
      </div>
      <audio ref={audioRef} src={audio}></audio>
    </div>
  )
}

export default Player