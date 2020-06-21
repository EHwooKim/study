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
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {[
            {fruit: '사과', taste:'맛있다'},
            {fruit: '포도', taste:'맛있다'},
            {fruit: '바나나', taste:'맛없다'},
            {fruit: '귤', taste:'시다'}
          ].map((v) => {
            return (
              <li key={v.fruit}><b>{v.fruit}</b> - {v.taste}</li> // Vue와 마찬가지로 반복문에는 key가 필요하다.
              // map((v, i) => {...})한 다음에 i값이 고유하니 key에 i를 넣는 행동은 성능최적화에 안좋으니 하지말자, 차라리 v.fruit + i 와 같이 쓰자(하지만 i를 안쓰는게 제일 좋다)
              // 요소 삭제 없이 추가만 되는 배열의 경우 i를 써도 되긴하다.
            )
          })}
          <li />
        </ul>
      </>
    )
  }
}

module.exports = NumberBaseball