import React, { memo } from 'react'

// 이건 Hooks가 아닌 그냥 함수 컴포넌트이다.
// useState, useEffect등을 사용안했기 떄문에.
// state를 안쓰면 그냥 이런 함수컴포넌트로 만드는 것이 좋다.
const Ball = memo(({ number }) => {
  let background
  if (number <= 10) {
    background = 'red'
  } else if (number <= 20) {
    background = 'orange'
  } else if (number <= 30) {
    background = 'yellow'
  } else if (number <= 40) {
    background = 'blue'
  } else {
    background = 'green'
  }
  return (
    <div className="ball" style={{ background }}>{number}</div>
  )
})


export default Ball