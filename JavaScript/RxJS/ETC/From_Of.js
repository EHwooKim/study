const Rx = require('rxjs')

/*
  # Observable 만들기 (from, of)
*/

/*
  ## Array로 부터 만들기 (from)  
*/

const deliveries = ['delivery1', 'delivery2', 'delivery3']
// 데이터의 흐름을 Observable이라고 한다.
const stream = Rx.from(deliveries) // Observable이 생겼으면
stream.subscribe({  // Observable을 구독(subscribe)한다
  next: (data) => { // 다음 데이터가 왔을 떄 수행할 행동
    console.log(data)
   },  
  complete: () => { // 데이터가 모두 왔을 떄 수행할 행동
    console.log('completed')
   },  
  error: (err) => { }  // 데이터를 가져오는 과정에 생긴 에러 처리
})

/*
  ## Promise로부터 만들기 (from)
*/
function makePromise() { // 3초뒤에 오는 데이터
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('delivery')
    }, 3000)
  })
}

Rx.from(makePromise()).subscribe({
  next: (data) => {
    console.log(`after 3 seconds ${data}`)
  }
})

/*
  ## 여러 싱글 데이터로부터 만들기 (of) 
*/
Rx.of('택배1', '택배2', 2020, true)
  .subscribe({
    next: (data) => console.log(data)
  })