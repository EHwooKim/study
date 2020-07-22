import React, { useContext, useCallback, memo, useMemo } from 'react'
import { CODE, TableContext, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './MineSearch'


const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#444'
      }
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        background: 'white'
      }
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: 'yellow'
      }
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: 'red'
      }
    default:
      return {
        background: 'white'
      }
  }
}

const getTdText = (code) => {
  console.log('getTdText - 이부분은 한번 실행되는 것을 보니 Td 컴포넌트의 return쪽은 한번만 리렌더링 되는구나')
  switch (code) {
    case CODE.NORMAL:
      return ''
    case CODE.MINE:
      return 'X'
    case CODE.CLICKED_MINE:
      return '펑'
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!'
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?'
    default:
      return code || ''
  }
}

const Td = memo(({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, halted } = useContext(TableContext)

  const onClickTd = useCallback(() => {
    if (halted) {
      return
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return
      case CODE.NORMAL:
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex })
        return
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex })
        return
      default:
        return
    }
  }, [tableData[rowIndex][cellIndex], halted])

  const onRightClickTd = useCallback((e) => {
    e.preventDefault()
    if (halted) {
      return 
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex })
        return
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex })
        return
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex })
        return
      default:
        return
    }
  }, [tableData[rowIndex][cellIndex], halted])

  console.log('Td rendered')

  // return useMemo(() => (
  //   <td
  //     style={getTdStyle(tableData[rowIndex][cellIndex])}
  //     onClick={onClickTd}
  //     onContextMenu={onRightClickTd}
  //   >{getTdText(tableData[rowIndex][cellIndex])}</td>
  // ), [tableData[rowIndex][cellIndex]])
  // 위 코드처럼 useMemo를 쓰는 것이 싫다면 아래처럼 컴포넌트를 쪼개는 방법도 있다.
  return <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />
})

const RealTd = memo(({ onClickTd, onRightClickTd, data}) => {
  console.log('real Td rendered')
  return (
    <td 
      style={getTdStyle(data)}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >{getTdText(data)}</td>
  )
})

export default Td