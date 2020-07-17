import React, { useState } from 'react'
import Board from './Board'
import StepButton from './StepButton'

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
}

function Game() {
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}])
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)

  const handleClick = (i) => {
    const array = history.slice(0, stepNumber + 1)
    const current = array[array.length - 1]
    const squares = [...current.squares]
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = xIsNext ? 'X' : 'O'
    setHistory(
      array.concat([{
        squares: squares
      }])
    )
    setStepNumber(history.length)
    setXIsNext(!xIsNext)
  }

  const jumpTo = (step) => {
    setStepNumber(step)
    setXIsNext((step % 2) === 0)
  }

  const moves = history.map((step, move) => {
    const desc = move ?
      `Go to move #${move}` :
      'Go to game start'
    return (
      <StepButton key={move} move={move} desc={desc} onClick={() => jumpTo(move)}/>
    )
  })

  const array = history
  const current = array[stepNumber]
  console.log('current', current)
  console.log(current.squares)
  const winner = calculateWinner(current.squares)
  console.log('winner', winner)
  let status = ''
  if (winner) {
    status = `Winner ${winner}`
  } else {
    status = `Next player : ${ xIsNext ? 'X' : 'O' }`
  }


  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )

}

export default Game