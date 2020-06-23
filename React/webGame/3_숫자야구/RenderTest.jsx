import React, { Component } from 'react'

class Test extends Component {
  state = {
    counter: 0,
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) { // 아래와 같이 원하지 않는 상황에 랜더링 되는 것을 막기 위해 랜더링 조건을 설정할 수 있다.
    if (this.state.counter !== nextState.counter) { // 현재의 counter값과 미래의 counter값이 다를 때만 랜더링 된다.
      return true
    }
    return false
  }

  onClick = () => {
    this.setState({}) // 버튼을 클릭하여 이렇게 아무런 변화가 없는 함수를 실행시켰을 때 과연 render가 될까?
  }                   // 클릭해보면 state나 props가 변경되지 않았는데도 랜더링이 되는 것을 확인할 수 있다.
                      // state가 변경되는 것을 감지하는게 아닌 setState가 호출되면 랜더링이 된다.

  render() {
    console.log('랜더링', this.state)
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    )
  }
}
export default Test