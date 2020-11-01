import form from './form'
import result from './result'
import './app.css'

let resultEl
let formEl

document.addEventListener("DOMContentLoaded", async () => {
  formEl = document.createElement('div')
  formEl.innerHTML = form.render()
  document.body.appendChild(formEl)

  resultEl = document.createElement('div')
  resultEl.innerHTML = await result.render()
  document.body.appendChild(resultEl)


  // 아직은 파일이 작아 코드스플리팅 불필요, externals 실습을 위해 주석처리
  // import(/* webpackChunkName: "result" */"./result").then(async m => {
  //   const result = m.default // result 모듈(m)이 default로 내보내주는 값
  //   resultEl = document.createElement('div')
  //   resultEl.innerHTML = await result.render()
  //   document.body.appendChild(resultEl)
  // })

});


// HMR(hot module replacement)을 켜면 module.hot에 값이 들어온다
if (module.hot) {
  console.log('핫 모듈 켜짐')
  
  module.hot.accept('./result', async () => {
    console.log('result 모듈 변경됨.')
    resultEl.innerHTML = await result.render()
  })

  module.hot.accept('./form', () => {
    console.log('form 모듈 변경됨.')
    formEl.innerHTML = form.render()
  })
}

console.log('app.js - Terser plugin이 제거해주길 바랍니다.')