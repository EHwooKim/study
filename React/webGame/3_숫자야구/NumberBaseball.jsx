const React = require('react')
const { Component, useEffect } = require('react')
const Try  = require('./Try')
// import React, { Component } from 'react'
// import Try from './Try'

function getNumbers() { // 숫자 네 개를 중복없이 랜덤하게 뽑는 함수
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const array = []
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0]
    array.push(chosen)
  }
  return array
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
    tries: [], // 배열에 값 넣을 때 push쓰면 안된다.!
  }

  // onChangeInput = function(e) { // 이렇게 화살표 함수를 사용 안하면 불편한 점이 많았는데
  //   console.log(this)           // 화살표 함수를 사용하면서 this 바인딩도 알아서 되고, state도 간단하게 쓸 수 있게 되었다.
  //   this.setState({
  //     value: e.target.value
  //   })
  // }  

  onSubmitForm = (e) => {
    e.preventDefault()
    if (this.state.value.length !== 4) {
      alert('숫자 4개를 입력해주세요')
      this.setState({
        value: ''
      })
      return
    }
    if ( this.state.value === this.state.answer.join('')) { // 답일 경우
      this.setState({
        result: '홈런!',
        tries: [...this.state.tries, { try: this.state.value, result: '홈런!' }], // 참조를 바뀌게 하여 리액트가 변화를 감지할 수 있게 해야한다. (push금지)
      })
      alert('게임을 다시 시작합니다!')
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      })
    } else { // 답이 아닐경우
      const answerArray = this.state.value.split('').map(v => parseInt(v))
      let strike = 0
      let ball = 0
      if (this.state.tries.length >= 9) { // 10번 이상 틀려 실패했을 때
        this.setState({
          result: `10번 넘게 틀려서 실패! ${this.state.answer.join(',')} 였습니다.`
        })
        alert('게임을 다시 시작합니다!')
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        })
      } else {
        for (let i = 0; i < 4; i +=1 ) {
          if (answerArray[i] === this.state.answer[i]) {
            console.log('스트라이크')
            strike += 1
          } else if (this.state.answer.includes(answerArray[i])) {
            console.log('볼')
            ball += 1
          }
        }
        this.setState({
          tries: [...this.state.tries, { try: this.state.value, result: `${strike}스트라이크, ${ball}볼입니다.`}],
          value: '',
        })
      }
    }
  }
  onChangeInput = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    return (
      <>
      {/* jsx 주석 */}
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ol>
          {this.state.tries.map((v, i) => {
            return (
              <Try key={`${i + 1}차 시도 : `} tryInfo={v} />
            )
          })}
        </ol>
      </>
    )
  }
}

module.exports = NumberBaseball
// export default NumberBaseball