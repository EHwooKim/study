// import React, { Component } from 'react' 
import React, { PureComponent } from 'react' 

class Test extends PureComponent {
  state = {
    counter: 0,
    array: [],
  }

  // shouldComponentUpdate(nextProps, nextState, nextContext) { // 아래와 같이 원하지 않는 상황에 랜더링 되는 것을 막기 위해 랜더링 조건을 설정할 수 있다.
  //   if (this.state.counter !== nextState.counter) { // 현재의 counter값과 미래의 counter값이 다를 때만 랜더링 된다.
  //     return true
  //   }
  //   return false
  // }
  /*
    그런데 이 과정이 너무 귀찮으면 위에서 Component가 아닌 PureComponent를 쓰면된다.
    shouldComponentUpdate를 구현해놓은 거라고 보면 된다.
    그런데 PureComponent의 단점은 객체, 배열과 같이 참조관계가 있는 state를 인식을 잘 못한다. 
  */



  //onClick = () => {
  //  this.setState({}) // 버튼을 클릭하여 이렇게 아무런 변화가 없는 함수를 실행시켰을 때 과연 render가 될까?
  //}                   // 클릭해보면 state나 props가 변경되지 않았는데도 랜더링이 되는 것을 확인할 수 있다.
                      // state가 변경되는 것을 감지하는게 아닌 setState가 호출되면 랜더링이 된다.

  
  onClick = () => {
    // const array = this.state.array
    // array.push(1)
    // this.setState({
    //   array: array// 이렇게 array값을 바꿔도 같은 array로 인식하기 때문에 PureComponent를 써도 랜더링이 인된다.
    // })
    this.setState({
      array: [...this.state.array, 1] // 이렇게 기존 배열을 활용하여 새 배열을 만들어 줘야 PureComponent가 변화를 인식한다. (랜더링된다)
    })
  }
  // 이러한 랜더링 문제로 state에는 객체 구조를 안쓰는게 좋다

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