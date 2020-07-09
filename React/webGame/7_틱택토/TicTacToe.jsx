import React, { useState, useReducer } from 'react'
import Table from './Table'

const initialState = { // ???? ????.
  winner: '',
  turn: 'O',
  tableData: [['', '', ''], ['', '', ''], ['', '', '']]
}

const reducer = (state, action) => {
  // ? ??? state? ??? ??? ????.
}

const TicTactoe = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // const [winner, setWinner] = useState('')
  // const [turn, setTurn] = useState('O')
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']])

  return (
    <> 
      <Table/>
      {winner && <div>{winner}?? ??</div>}
    </>
  )
}

export default TicTactoe