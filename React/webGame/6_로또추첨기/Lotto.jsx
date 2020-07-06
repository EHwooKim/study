import React, { useState, useRef, useEffect } from 'react'
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
  const [winNumbers, setWinNumbers] = useState(getWinNumbers())
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
  const onClickRedo = () => {
    setWinNumbers(getWinNumbers())
    setWinBalls([])
    setBonus(null)
    setRedo(true)
    timeouts.current = []
  }

  return(
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map(v => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus}/> }
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  )
}

export default Lotto