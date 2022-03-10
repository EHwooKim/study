const Rx = require('rxjs')
const { take } = require('rxjs/operators')

/*
  # Observable 만들기 (interval, timer)
  - FromOf 에서는 정해진 데이터로 Observable을 만들었는데
    이번에는 시간에 따른 데이터 스트림(Observable)을 만들어 보자
*/

/*
  ## Interval
*/
const intervalStream = Rx.interval(1000) // 1초에 한번씩 데이터가 생성되는 Observable

intervalStream.pipe(
  take(10)            // 10개만 받는다.
).subscribe({
  next: (data) => {
    console.log(data) // 0부터 1씩 증가된 값이 출력
  }
})


/*
  ## timer
*/
const timerStream = Rx.timer(2000, 1000) // 2초 delay후에 1초에 한번씩 데이터 흐름

timerStream.pipe(
  take(5)
).subscribe({
  next: console.log
})