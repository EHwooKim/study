import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import Ball from './Ball'

function getWinNumbers() {
  console.log('getWinNumbers')
  const candidate = Array(45).fill().map((v, i) => i + 1)
  const shuffle = []
  while (candidate.length > 0 ) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0])
  }   
  const bonusNumber = shuffle[shuffle.length - 1]
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c)
  return [...winNumbers, bonusNumber]
}

const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), [winBalls]) //  getWinNumbers를 기억하여 함수를 다시 실행하지 않는다. 두번째 인자가 바뀌어야 다시 실행된다
  const [winNumbers, setWinNumbers] = useState(lottoNumbers)
  const [winBalls, setWinBalls] = useState([])
  const [bonus, setBonus] = useState(null)
  const [redo, setRedo] = useState(false)
  const timeouts = useRef([])

  useEffect(() => {
    console.log('useEffect')
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]])
      }, (i + 1) * 1000)
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6])
      setRedo(true)
    }, 7000)
    return () => {
      timeouts.current.forEach(v=> {
        clearTimeout(v)
      })
    }
  }, [timeouts.current]) // 두번째 자리가 빈배열이면 compnentDidMount랑 똑같다.
  // 두번째 배열에 요소가 있으면 componentDidMount랑 componentDIdUpdate 둘 다 수행

  const onClickRedo = useCallback(() => { // (올바른 예제는 아닐수있지만) 함수 자체를 기억하게 하여
    console.log('onClickRedo')            // 함수 컴포넌트가 재실행되어도 이 함수가 새로 생성되지 않는다. 따라서 함수 생성 자체가 오래 걸리는 경우 사용하면 좋다.
    console.log(winNumbers) // 그렇다고해서 모든 겨우에 useCallback을 쓰면 안되는 이유가, 기억을 너무 잘해서 이렇게 처음 값을 계속 기억한다.
    setWinNumbers(getWinNumbers())        
    setWinBalls([])                       
    setBonus(null)
    setRedo(true)
    timeouts.current = []
  }, [winNumbers]) // useEffect와 마찬가지로 두번쨰 인자가 바뀔때 새로 실행되기때문에 useCallback안에서 state를 사용할 경우 이렇게 넣어줘야한다.

  return(
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map(v => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} onClick={onCLickRedo}/>  }
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  )
}

export default Lotto