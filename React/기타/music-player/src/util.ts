import { MutableRefObject } from 'react'

export const playAudio = (isPlaying: boolean, audioRef: MutableRefObject<HTMLAudioElement>) => {
  if (isPlaying) {
    const playPromise = audioRef.current.play()
    if (playPromise !== undefined) {
      playPromise.then(() => {
        audioRef.current.play()
      })
    }
  }
}