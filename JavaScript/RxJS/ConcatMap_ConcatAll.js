const Rx = require('rxjs')
const { take, tap, concatMap, concatAll } = require('rxjs/operators')

const stream = Rx.from(['택배1', '택배2', '택배3'])

/*
  # concatMap
  - 데이터의 흐름이 들어올 때 각 데이터마다 다른 Observable로 mapping을 시켜준다
*/

function openBox(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(data, '상품 개봉')
      resolve(data)
    }, 1000)
  })
}
function checkBox(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(data, '상품 확인')
      resolve(data)
    }, 1000)
  })
}
function useProduct(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(data, '상품 사용')
      resolve(data)
    }, 1000)
  })
}

async function userTask(data) {
  await openBox(data)
  await checkBox(data)
  await useProduct(data)
}

stream.pipe(
  concatMap((data) => Rx.from(userTask(data)))
).subscribe()

/*
  # concatAll
  - Observable의 Observable을 위한 Operator
*/

const stream1 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream2 = Rx.interval(1000).pipe(take(3), tap(console.log))

const stream3 = Rx.of(stream1, stream2)

stream3.pipe(
  concatAll()
).subscribe()
