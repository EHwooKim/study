import React, { useState, useRef, useEffect } from 'react'

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px'
}
const scores = {
  가위: 1,
  바위: 0,
  보: -1,
}
const computerChoice = imgCoord => Object.entries(rspCoords).find(v => v[1] === imgCoord)[0]


const RSP = () => {
  const [result, setResult] = useState('')
  const [imgCoord, setImgCoord] = useState(rspCoords.바위)
  const [score, setScore] = useState(0)
  const interval = useRef()
  // Class Component 의 라이프사이클을 흉내낼 수 있는 useEffect
  useEffect(() => { // componentDidMount, componentDidUpdate 역할 (1대1 대응은 아님)
    console.log('랜더링때마다 실행되겠지')
    interval.current = setInterval(changeHand, 100)
    return () => { // 이 return 이 componentWillUnmount 역할
      console.log('종료 - clearInterval도 실행되니 결국 setTimeout과 같아지게된다.')
      clearInterval(interval.current)
    }
  }, [imgCoord])// Class 에서 클로저 문제로 가위바위보 안바뀌었는데, Hooks에서는 두번째 인자의 배열이 그것을 해결해준다
                // useEffect를 실행하고 싶은 값을 적어준다. (imgCoord가 바뀔 때 useEffect가 실행된다.)
                // 즉, componentDidUpdate와 같이 쓰려면 배열안에 참조할 값을 써줘야한다.
  /*
    함수 컴포넌트는 랜더링 될 때 모든 코드가 통쨰로 다시 실행된다.
    그래서 랜더링될 때마다 useEffect도 실행되게 되는데 그렇다보니 setInterval -> clerInterval이 반복되면서 setTimeout과 같지만, 
    이 setTimeout같은 형태가 계속 반복되면서 setInterval과 같은 효과를 나타내게 된다.
  */

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위)
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보)
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위)
    }
  }

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current)
    const myScore = scores[choice]
    const cpuScore = scores[computerChoice(imgCoord)]
    const diff = myScore - cpuScore
    if (diff === 0) {
      setResult('비겼습니다')
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다')
      setScore((prevScore) => prevScore + 1)
    } else {
      setResult('졌습니다.')
      setScore((prevScore) => prevScore + 1)     
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100)
    }, 1000)
  }

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} ></div>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
        <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  )
}


export default RSP