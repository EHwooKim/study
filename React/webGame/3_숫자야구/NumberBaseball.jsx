const React = require('react')

function getNumbers() { // 숫자 네 개를 중복없이 랜덤하게 뽑는 함수

}

class NumberBaseball extends React.Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [],
  }

  onSubmitForm = (e) => {

  }
  onChangeInput = (e) => {

  }

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSUbmit={this.onSubmitForm}>
          <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {['like1', 'like2', 'like3', 'like4'].map((v) => {
            return (
              <li>{v}</li>
            )
          })}
          <li />
        </ul>
      </>
    )
  }
}

module.exports = NumberBaseball