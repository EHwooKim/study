import React from 'react'
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom'
import NumberBaseball from './NumberBaseball/NumberBaseball'
import RSP from './RSP/RSP'
import Lotto from './Lotto/Lotto'


const Games = () => {
  return (
    <BrowserRouter>
      <div>
        공통인 부분
        <Link to="/number-baseball">숫자야구</Link>
        &nbsp;
        <Link to="/rock-scissors-paper">가위바위보</Link>
        &nbsp;
        <Link to="/lotto-generator">로또추첨기</Link>
      </div>
      <div>
        <Route path="/number-baseball" component={NumberBaseball}></Route>
        <Route path="/rock-scissors-paper" component={RSP}></Route>
        <Route path="/lotto-generator" component={Lotto}></Route>
      </div>
    </BrowserRouter>
  )
}
export default Games