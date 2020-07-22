import React, { useState, useCallback, useContext, memo } from 'react'
import { TableContext, START_GAME } from './MineSearch'

const Form = memo(() => {
  const [inputValue, setInputValue] = useState({row: 10, cell: 10, mine: 20})

  const { dispatch } = useContext(TableContext) // value로 불러와서 value.dispatch로 쓸 수 도있지만 지금은 dispatch만 필요하니 구조분해로 불러옴

  const onChangeInput = useCallback((e) => {
    const { name, value } = e.target
    setInputValue({
      ...inputValue,
      [name]: value
    })
    console.log('name:', name, 'value: ', value)
  })
  const onSubmitForm = useCallback((e) => {
    e.preventDefault()
    const { row, cell, mine } = inputValue
    dispatch({ type: START_GAME, row, cell, mine })
  }, [inputValue.row, inputValue.cell, inputValue.mine])

  return (
    <form onSubmit={onSubmitForm}>
      <input type="number" name="row" placeholder="세로" value={inputValue.row} onChange={onChangeInput}/>
      <input type="number" name="cell" placeholder="가로" value={inputValue.cell} onChange={onChangeInput}/>
      <input type="number" name="mine" placeholder="지뢰" value={inputValue.mine} onChange={onChangeInput}/>
      <button>시작!</button>
    </form>
  )
})

export default Form