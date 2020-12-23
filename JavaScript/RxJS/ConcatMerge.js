const Rx = require('rxjs')
const { take } = require('rxjs/operators')

/*
  # 두개 이상의 Observable을 하나로 이어 붙이는 방법
*/

const stream1 = Rx.from([1, 2, 3, 4, 5])
const stream2 = Rx.from([6, 7, 8, 9, 10])
// 위 두개의 Observable의 값들이 연달아 출력되길 바라는 상황..

const stream3 = Rx.interval(1000).pipe(take(2))
const stream4 = Rx.interval(1000).pipe(take(3))

/*
  ## concat
  - 이어 붙이다.
*/
Rx.concat(stream1, stream2).subscribe({
  next: console.log // 1, 2, ..., 10
})

Rx.concat(stream3, stream4).subscribe(console.log)
// 0, 1, 0, 1, 2


/*
  ## merge 
  - 병합하다.
  - concat처럼 이어 붙이는 것이 아닌
    두 스트림을 병렬적으로 처리한다.
*/

Rx.merge(stream3, stream4).subscribe(console.log)
// 0, 0, 1, 1, 2  <= concat과 다르게 병렬적으로 처리된 것을 확인할 수 있다.