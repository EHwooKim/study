// import React, { Component } from 'react'
const React = require('react')
const { PureComponent } = require('react')

class TryClass extends PureComponent {
  // props를 state로 만들어서 값 변경하기 (자식에서 바꿔야한다면)
  // state = {
  //   result : this.props.result,
  //   try: this.props.try,
  // }

  // constructor 쓸 필요 없었지, 그런데 이것도 결국 함수라 함수 안에서 뭔가 행동을 추가적으로 하고싶다면 이렇게 쓰면된다.
  // constructor(props) {
  //   super(props)
  //   //
  //   const filtered = this.props.filter(() => { 
  //     // do something
  //   })
  //   this.state = {
  //     result : filtered,
  //     try: this.props.try,
  //   }    
  // }
  
  render() {
    const { tryInfo } = this.props
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    )
  }
}

module.exports = TryClass
// export default Try