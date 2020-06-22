const React = require('react')

const Try = ({ tryInfo }) => { // 함수 인자가 원래 props자리인데 구조분해로 원하는 것만 뺐다.
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>    
  )
}

module.exports = Try