const Rx = require('rxjs')
const { take, tap, filter, map, reduce } = require('rxjs/operators')

const stream = Rx.from([1, 2, 3, 4, 5])

/*
  # tap
  - 데이터에는 영향을 끼치지 않고 사전 작업
*/

stream.pipe(
  tap(data => {
    console.log('tap first', data + 1)
  }),
  tap(data => {
    console.log('tap second', data + 10)
  })
).subscribe(console.log)

/*
  # filter, map, reduce
  - Array.prototype.filter와 동일한 기능
*/
stream.pipe(
  filter(data => data > 2),
  map(data => data ** 2),
  tap(console.log),
  reduce((a, c) => a + c)
).subscribe(console.log)

