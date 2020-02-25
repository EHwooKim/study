const log = console.log

/*
  # 일급 함수
  - 함수가 값으로 다뤄질 수 있다.
  # 고차 함수
  - 함수를 값으로 다루는 함수
    ## 함수를 인자로 받아서 실행하는 함수
    - apply1
    - times
    ## 함수를 만들어서 리턴하는 함수 (클로저를 만들어 리턴하는 함수)
    - addMaker
*/

const apply1 = f => f(1) // 함수를 인자로 받아 실행한다. f => (a => a + 2)(1) 인거지
const add2 = a => a + 2
log(apply1(add2))
log(apply1(a => a - 1))

const times = (f, n) => {
  let i = -1 
  while (++i < n) f(i)
}
times(log, 3)
times(a => log(a + 10), 3)

const addMaker = a => b => a + b
const add10 = addMaker(10)
log(add10)
log(add10(10))
// addMaker는 함수를 리턴하는 함수이면서 클로저를 만들어 리턴하는 함수로
// 클로저는 이 함수가 a를 계속 기억하다는 것을 의미한다