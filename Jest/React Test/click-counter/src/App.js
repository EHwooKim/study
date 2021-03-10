import React, { useState } from 'react'
import './App.css';

function App() {
  const [count, setCount] = useState(0)
  const [hiddenError, setHiddenError] = useState(true)

  const onClickIncrease = () => {
    setHiddenError(true)
    setCount(count + 1)
  }
  const onClickDecrease = () => {
    let nextCount = count - 1
    if (nextCount < 0) {
      nextCount = 0
      setHiddenError(false)
    }
    setCount(nextCount)
  }

  return (
    <div data-test="component-app">
      <h1 data-test="counter-display">
        The counter is currently
        <span data-test="count">{count}</span>
      </h1>
      <div data-test="error-message" className={`error ${hiddenError ? 'hidden' : ''}`}>
        The counter cannot go below 0
      </div>
      <button 
        data-test="increment-button"
        onClick={onClickIncrease}
      >
        increment counter
      </button>
      <button 
        data-test="decrement-button"
        onClick={onClickDecrease}
      >
        increment counter
      </button>
    </div>
  );
}

export default App;
