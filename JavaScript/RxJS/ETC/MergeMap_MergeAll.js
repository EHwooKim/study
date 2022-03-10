const Rx = require('rxjs')
const { take, map, tap, mergeMap, mergeAll } = require('rxjs/operators')

const stream = Rx.interval(1000).pipe(take(3), map(n => `택배 ${n + 1}`))

function openBox(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(data, '상품 개봉')
      resolve(data)
    }, 2000)
  })
}
function checkBox(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(data, '상품 확인')
      resolve(data)
    }, 2000)
  })
}
function useProduct(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(data, '상품 사용')
      resolve(data)
    }, 2000)
  })
}

async function userTask(data) {
  await openBox(data)
  await checkBox(data)
  await useProduct(data)
}
/*
  # mergeMap
  - concatMap에서 병렬처리 더해진것
*/

// stream.pipe(
//   mergeMap(data => Rx.from(userTask(data)))
// ).subscribe()

/*
  # mergeAll
  - concatAll은 순차적으로 처리했지만 mergeAll은 동시실행
*/

const stream1 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream2 = Rx.interval(1000).pipe(take(3), tap(console.log))

const stream3 = Rx.of(stream1, stream2)

// stream3.pipe(
//   mergeAll()
// ).subscribe()

/*
  아래 4개의 stream을 두개씩 묶어서 동시 진행하고 
  한 묶음이 끝나야 다음 묶음의 stream이 실행되도록 코드를 작성해보자  
*/

const stream11 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream12 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream13 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream14 = Rx.interval(1000).pipe(take(3), tap(console.log))
const stream15 = Rx.interval(1000).pipe(take(3), tap(console.log))

const stream16 = Rx.of(stream11, stream12, stream13, stream14, stream15)

stream16.pipe(
  mergeAll(2)
).subscribe()