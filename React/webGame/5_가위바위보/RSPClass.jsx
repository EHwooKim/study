import React, { Component } from 'react'

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px'
}
const scores = {
  가위: 1,
  바위: 0,
  보: -1,
}
const computerChoice = imgCoord => Object.entries(rspCoords).find(v => v[1] === imgCoord)[0]

class RSPClass extends Component {
  state = {
    result: '',
    imgCoord: '0',
    score: 0,
  }

  interval

  componentDidMount() { // 랜더가 '처음' 성공적으로 실행됐다면 실행된다. state의 변화로 인해 리랜더링될 때는 실행 안된다.
    // 보통 여기에서 비동기 요청을 많이한다.
    this.interval = setInterval(this.changeHand, 100) // 컴포넌트가 사라져도 이 setInterval이 자동으로 사라지지않는다. 내가 지워줘야한다
  }

  componentDidUpdate() { // 리랜더링됐을 때 실행

  }

  componentWillUnmount() { // 컴포넌트가 제거되기 직전
    // 보통 여기에서 비동기 요청 정리를 많이 한다.
    clearInterval(this.interval)
  }

  changeHand = () => { 
    const { imgCoord } = this.state // (changeHand로 따로 함수로 뺴기전에)이 한줄을 setInterval 밖에 썼을 때 생각처럼 작동안했다 -> 클로저 문제
    if (imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위
      })
    } else if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보
      })
    } else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위
      })
    }
  }

  onClickBtn = (choice) => () => {
    const { imgCoord } = this.state
    clearInterval(this.interval)
    const myScore = scores[choice]
    const cpuScore = scores[computerChoice(imgCoord)]
    const diff = myScore - cpuScore
    if (diff === 0) {
      this.setState({
        result: '비겼습니다.'
      })
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: '이겼습니다.',
          score: prevState.score + 1
        }
      })
    } else {
      this.setState((prevState) => {
        return {
          result: '졌습니다..',
          score: prevState.score - 1
        }
      })      
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100)
    }, 1000)
  }

  render() {
    const { result, score, imgCoord } = this.state
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} ></div>
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    )
  }
}

export default RSPClass