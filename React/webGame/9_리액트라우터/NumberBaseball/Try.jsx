const React = require('react')
const { memo, useState } = require('react')

const Try = memo(({ tryInfo }) => { // 함수 인자가 원래 props자리인데 구조분해로 원하는 것만 뺐다.
  // props 값은 부모가 바꿔줘야한다. 그런데 props를 바꿔야할 경우가 있다면 이 props를 state에 넣어준다<div className=""></div>
  // const [result, setResult] = useState(tryInfo.result)
  // const onClick = () => {
  //   setResult('1')
  // }
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
      {/* <div onclick={onClick}>{tryInfo.result}</div>  // 자식이 props를 바꿀일이 있다면 props를 sate로 바꿔서 바꿔야한다!*/}  
    </li>    
  )
})

module.exports = Try