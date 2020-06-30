import React, { useState, useRef } from 'react'

const ResponseCheck = () => {
  const [state, setState] = useState('waiting')
  const [message, setMessage] = useState('클릭해서 시작하세요')
  const [result, setResult] = useState([])
  // class로 만들었을 떄 썼던 timeout, endTime, startTime같은 변수들은 ref를 써서 만들어줘야한다.
  const timeout = useRef(null)
  const startTime = useRef()
  const endTime = useRef()
  /*
    # useState, useRef 의 차이는?
    - useRef는 DOM 접근시 사용 가능하다.
    - useState는 set을 통해 값이 변경되면 하단 return부분이 실행된다.
    - useRef는 값이 변경되어도 하단 return부분이 실행되지 않는다.
  */

  const onClickScreen = () => {
    if ( state === 'waiting' ) {
      setState('ready')
      setMessage('초록색이 되면 클릭하세요')
      timeout.current = setTimeout(() => {
        setState('now')
        setMessage('지금 클릭하세요')
        startTime.current = new Date()
      }, Math.floor(Math.random() * 1000) + 2000) // 2초 ~ 3초 랜덤
    }else if (state === 'ready') { // 성급한 클릭
      clearTimeout(timeout.current)
      setState('waiting')
      setMessage('너무 성급하셨군요! 초록색이 된 후에 클릭하세요')
    }else if ( state === 'now' ) { // 반응속도 체크 
      endTime.current = new Date()
      setState('waiting')
      setMessage('클릭해서 시작하세요')
      setResult((prevResult) => {
        return [...prevResult,  endTime.current - startTime.current]
      })
    }
  }
  const onReset = () => {
    setResult([])
  }

  const renderAverage = () => {
    return result.length === 0 
    ? null  // false, undefined, null은 jsx에서 태그없음을 의미한다.
    : <>
      <div>평균시간: {result.reduce((a, c) => a + c) / result.length}ms</div> 
      <button onClick={onReset}>리셋</button>  
    </>
  }


  return (
    <>
      <div
        id="screen"
        className={state}
        onClick={onClickScreen}
      >
        {message}  
      </div>
      { renderAverage() }
    </>
  )

}

export default ResponseCheck