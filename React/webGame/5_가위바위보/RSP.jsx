import React, { Component } from 'react'

class RSP extends Component {
  state = {
    result: '',
    imgCoord: 0,
    scor: 0,
  }

  componentDidMount() { // 랜더가 '처음' 성공적으로 실행됐다면 실행된다. state의 변화로 인해 리랜더링될 때는 실행 안된다.

  }

  componentDidUpdate() { // 리랜더링됐을 때 실행

  }

  componentWillUnmount() { // 컴포넌트가 제거되기 직전

  }

  render() {
    const { result, score, imgCoord } = this.state
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} ></div>
        <div>
          <button id="rock" className="btn" onClick={() => onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={() => onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={() => onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    )
  }
}

export default RSP