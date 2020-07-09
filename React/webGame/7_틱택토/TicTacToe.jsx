import React, { useState, useReducer, useCallback } from 'react'
import Table from './Table'

const initialState = { // 초기값을 적어준다.
  winner: '',
  turn: 'O',
  tableData: [['', '', ''], ['', '', ''], ['', '', '']]
}
export const SET_WINNER = 'SET_WINNER' // 이렇게 상수로 action명을 빼두면 편하다
export const CLICK_CELL = 'CLICK_CELL' // 만든 CLICK_CELL을 Td(자식컴포넌트)에서 쓸거니까 export로 내보내준다.
export const CHANGE_TURN = 'CHANGE_TURN'

const reducer = (state, action) => {
  // state를 어떻게 바꿀지 적어준다.
  switch (action.type) { // action이 여러개가 있을테니 action.type으로 분기처리
    case SET_WINNER:
      return {
        // state.winner = action.winner 이렇게 직접 바꾸는게 아니다!!
        ...state, // 기존 state를 전개하고
        winner: action.winner // 바꿀 state만 덮어씌우기
      }
    case CLICK_CELL:{
      const tableData = [...state.tableData] // 불변성위해 얕은 복사 후 사용 - immer 라이브러리로 가독성 문제로 해결 가능
      tableData[action.row] = [...tableData[action.row]]
      tableData[action.row][action.cell] = state.turn 
      return {
        ...state,
        tableData
      }
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O'
      }
    }
  } 
}

const TicTactoe = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  // const [winner, setWinner] = useState('')
  // const [turn, setTurn] = useState('O')
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']])

  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: 'O' }) //dispatch 안에 들어가는 것을 action이라고 부른다.
  }, []) // dispatch안에 action 객체를 만들고, dispatch를 하면 해당 action을 실행한다고 생각하면 된다.
         // action만 있다고 state가 바뀌는 것이 아니라 action을 해석해서 state를 바꿔주는 reducer가 필요하다.

  return (
    <> 
      <Table onClick={onClickTable} tableData={state.tableData}  dispatch={dispatch} />
      {state.winner && <div>{state.winner}님의 승리</div>}
    </>
  )
}

export default TicTactoe