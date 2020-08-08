import React, { useState, useEffect } from 'react'
import './Watch.css'

const Watch = () => {
  let [time, setTime] = useState(0)

  const increaseTime = () => {
    console.log('tic')
    setTime(prevTime => prevTime + 1)
  }

  useEffect(() => {
    const now = new Date()
    setTime(now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds())
    const interval = setInterval(increaseTime, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="watch-container">
      <span>{Math.floor(time / 3600)} : {Math.floor((time % 3600) / 60) < 10 ? '0' + Math.floor((time % 3600) / 60) : Math.floor((time % 3600) / 60)}</span>
    </div>
  )
}

export default Watch