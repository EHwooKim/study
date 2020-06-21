const React = require('react')
const { Component } = require('react')
const Try  = require('./Try')
// import React, { Component } from 'react'
// import Try from './Try'

function getNumbers() { // 숫자 네 개를 중복없이 랜덤하게 뽑는 함수

}

class NumberBaseball extends Component {
  // constructor(props) { // 메서드를 화살표함수로 작성안할 시 이렇게 써줘야만한다.
  //   super(props)
  //   this.  state = {
  //     result: '',
  //     value: '',
  //     answer: getNumbers(),
  //     tries: [],
  //   }
  //   this.onSubmitForm = this.onSubmitForm.bind(this)
  //   this.onChangeInput = this.onChangeInput.bind(this)
  // }
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [],
  }

  // onChangeInput = function(e) {
  //   console.log(this)
  //   this.setState({
  //     value: e.target.value
  //   })
  // }  

  onSubmitForm = (e) => {
    e.preventDefault()
  }
  onChangeInput = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  fruits = [
    {fruit: '사과', taste:'맛있다'},
    {fruit: '포도', taste:'맛있다'},
    {fruit: '바나나', taste:'맛없다'},
    {fruit: '귤', taste:'시다'}
  ]

  render() {
    return (
      <>
      {/* jsx 주석 */}
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.fruits.map((v, i) => {
            return (
              <Try key={v.fruit + v.taste} value={v} index={i} />
            )
          })}
        </ul>
      </>
    )
  }
}

module.exports = NumberBaseball
// export default NumberBaseball