import React, { useState, useCallback, useContext } from 'react'
import { Tablecontext, START_GAME } from './MineSearch'

const Form = () => {
  const [row, setRow] = useState(10)
  const [cell, setCell] = useState(10)
  const [mine, setMine] = useState(20)
  const { ditpatch } = useContext(Tablecontext) // value로 불러와서 value.dispatch로 쓸 수 도있지만 지금은 dispatch만 필요하니 구조분해로 불러옴


  const onChangeRow = useCallback((e) => {
    setRow(e.target.value)
  }, [])
  const onChangeCell = useCallback((e) => {
    setCell(e.target.value)
  }, [])
  const onChangeMine = useCallback((e) => {
    setMine(e.target.value)
  }, [])
  
  const onClickBtn = useCallback(() => {
    ditpatch({ type: START_GAME. row, cell, mine })
  }, [row, cell, mine])

  return (
    <div>
      <input type="number" placeholder="세로" value={row} onChange={onChangeRow}/>
      <input type="number" placeholder="가로" value={cell} onChange={onChangeCell}/>
      <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine}/>
      <button onClick={onClickBtn}>시작!</button>
    </div>
  )
}

export default Form