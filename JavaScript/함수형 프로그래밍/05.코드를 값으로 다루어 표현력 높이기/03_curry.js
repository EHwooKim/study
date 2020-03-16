/*
  ## curry
  - 함수를 값으로 다루면서, 받아둔 함수를 내가 원하는 시점에 평가시키는 함수.
  - 함수를 받아 함수를 리턴하고, 인자를 받아 원하는 인자의 개수만큼 들어왔을 떄 함수를 실행시킨다.
*/

const curry = f =>  // 함수를 받아서 함수를 리턴하는데,
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._) // 받은 인자가 두개 이상이라면 함수를 즉시 실행, 아니면 함수를 리턴하여 그 이후에 받은 인자들도 함쳐서 실행하는 함수인 curry

const mult = curry((a, b) => a * b)
console.log(mult(2)) // 인자를 한개만 넘겼을 떄는 함수가 리턴
console.log(mult(2)(3)) // 두개 이상부터 함수 실행

const mult3 = mult(3)  // 이렇게 한개의 인자를 미리 전달해 놓고
console.log(mult3(10)) // 그것을 활용하여 아래와 같은 계산들을 하는 패턴.
console.log(mult3(5))
console.log(mult3(3))  

/*
  curry를 사용하여
  앞서 만든 map+filter+reduce_withGo 를 더 간단하게 만들 수 있다.
*/
const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
]
const add = (a, b)  => a + b

// filter, map, reduce에 curry를 적용시켜보자.
const map = curry((f, iter) => {
  let res = []
  for (const a of iter) {
    res.push(f(a))
  }
  return res
})

const filter = curry((f, iter) => {
  let res = []
  for (const a of iter) {
    if (f(a)) res.push(a)
  }
  return res
})

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]()
    acc = iter.next().value
  }
  for (const a of iter) {
    acc = f(acc, a)
  }
  return acc
})

// 위 함수에 모두 curry를 적용시켰는데, 이는 이 함수들이 인자를 한개만 받았을 때는 이후 인자를 더 받길 기다리는 함수가 된 것이다.

const go = (...args) => reduce((a, f) => f(a), args)

go(
  products,
  products => filter(p => p.price < 20000)(products),
  products => map(p => p.price)(products),
  prices => reduce(add)(prices),
  console.log)
// 이렇게 표현이 가능한데, 각 줄을 자세히보면, products를 받아 products를 그대로 전달하는 모양새이니
go(
  products,
  filter(p => p.price < 20000),
  map(p => p.price),
  reduce(add),
  console.log)
// 그래서 이렇게 표현이 가능하다.

/*
  ## 총정리
  - 함수를 값으로 다루는 함수들을 이용하여 ( 순서 바꾸는 go, 함수를 부분적으로 실행하는 curry )
  - map+filter+reduce 형태의 거꾸로 해석하는 형태에서
  - go 함수를 사용하여 읽기 편한, 앞에서 부터 해석되는 코드로 바꾸었고
  - curry를 사용하여 표현을 간결하게 하였다.
*/