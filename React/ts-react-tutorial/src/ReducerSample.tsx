import React from 'react'
import { useSampleState, useSampleDispatch } from './SampleContext'


function ReducerSample() {
  const state = useSampleState()
  const dispatch = useSampleDispatch()

  const { count, text, color, isGood } = state
  const setCount = () => dispatch({ type: 'SET_COUNT', count: Math.floor(Math.random() * 10) })
  const setText = () => dispatch({ type: 'SET_TEXT', text: `현재시각: ${new Date().toTimeString()}`})
  const setColor = () => dispatch({ type: 'SET_COLOR', color: 'orange' })
  const toggleGood = () => dispatch({ type: 'TOGGLE_GOOD' })
  
  return (
    <div>
      <p>
        <code>count: </code> {count}
      </p>
      <p>
        <code>text: </code> {text}
      </p>
      <p>
        <code>color: </code> {color}
      </p>
      <p>
        <code>isGood: </code> {isGood ? 'true' : 'false'}
      </p>
      <div>
        <button onClick={setCount}>setCount</button>
        <button onClick={setText}>setText</button>
        <button onClick={setColor}>setColor</button>
        <button onClick={toggleGood}>toggleGood</button>
      </div>
    </div>
  )
}

export default ReducerSample