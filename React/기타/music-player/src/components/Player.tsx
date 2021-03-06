import React, { SetStateAction, Dispatch } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'

import { SongInfoType } from '../App'
import { SongDataType } from '../data'


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

  const activeLibraryhandler = (nextPrev: SongDataType) => {
    const newSongs = songs.map((s) => {
      if (s.id === nextPrev.id) {
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
  }

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

  const skipTrackHandler = async (direction: string) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    if (direction === 'skip-forward') {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length])
      activeLibraryhandler(songs[(currentIndex + 1) % songs.length])
    } 
    if (direction === 'skip-back') {
      if (currentIndex === 0) {
        await setCurrentSong(songs[songs.length - 1])
        activeLibraryhandler(songs[songs.length - 1])
        if (isPlaying) audioRef.current.play()
        return 
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length])
      activeLibraryhandler(songs[(currentIndex - 1) % songs.length])
    }
    if (isPlaying) audioRef.current.play()
  }
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`
  }
  const trackBackgroundColor = {
    background: currentSong.color 
      ? `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`
      : 'lightblue' 
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div className="track" style={trackBackgroundColor} >
          <input 
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range" 
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : '00:00'}</p>
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