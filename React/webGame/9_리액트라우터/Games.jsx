import React from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import NumberBaseball from './NumberBaseball/NumberBaseball'
import RSP from './RSP/RSP'
import Lotto from './Lotto/Lotto'


const Games = () => {
  return (
    <BrowserRouter>
    <div>
      <Route path="/number-baseball" component={NumberBaseball}></Route>
      <Route path="/rock-scissors-paper" component={RSP}></Route>
      <Route path="/lotto-generator" component={Lotto}></Route>
    </div>
    </BrowserRouter>
  )
}
export default Games