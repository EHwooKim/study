import React, { useCallback, useEffect, useRef, memo } from 'react'
import { CLICK_CELL } from './TicTacToe'

const Td = memo(({rowIndex, cellIndex, cellData, dispatch}) => { //dispatch 는 부모 TicTacToe로부터 계속 넘겨 받는다.
  console.log('td rendered')

  /* 
    랜더링문제가 어디서 발생하는지 파악하기 위해 useEffect와 useRef를 사용했다.
    모든 props를들 useEffect에 넣어서 console을 찍어본다
  */
  const ref = useRef([])
  useEffect(() => {
    // 아래처럼 이전 값과 비교하여 바뀐 값이 있다면 (false가 뜬다면) 그것 때문에 리랜더링이 일어나는 것이다.
    console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3])
    console.log(cellData, ref.current[3])
    ref.current = [rowIndex, cellIndex, dispatch, cellData]
  }, [rowIndex, cellIndex, dispatch, cellData]) 
  
 
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
})

export default Td