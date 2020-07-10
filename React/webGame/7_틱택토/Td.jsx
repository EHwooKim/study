import React, { useCallback } from 'react'
import { CLICK_CELL } from './TicTacToe'

const Td = ({rowIndex, cellIndex, cellData, dispatch}) => { //dispatch 는 부모 TicTacToe로부터 계속 넘겨 받는다.
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex)
    if (cellData) {
      return
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex })// dispatch는 비동기적으로 state를 바꾸기 때문에 이 코드 아래줄에 console.log(state.turn)를 해도 바뀌기 전 turn이 출력될 것이다
  }, [cellData]) // 조건문 속 cellData가 바뀌어야 하니 두번쨰 인자로 cellData를 넣어줘야한다

  return (
  <td onClick={onClickTd}>{cellData}</td>
  )
}

export default Td