import React, { useReducer } from 'react'


type State = {
  count: number
}

// action들을 | 으로 쭉 나열한다.
type Action = { type: 'INCREASE' } | { type: 'DECREASE'} 

const initialState: State = {
  count: 0
}

export const INCREASE = 'INCREASE'
export const DECREASE = 'DECREASE'


function reducer(state:State, action: Action): State {
  switch (action.type) {
    case INCREASE:
      return { count: state.count + 1}
    case DECREASE:
      return { count: state.count - 1}
    default:
      throw new Error('Unhandled action')
  }
}


function ReducerCounter() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const onIncrease = () => dispatch({ type: INCREASE })
  const onDecrease = () => dispatch({ type: DECREASE })

  return (
    <>
      Count: { state.count }
      <button onClick={onIncrease}> + </button>
      <button onClick={onDecrease}> - </button>
    </>
  )
}

export default ReducerCounter