const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
]
const add = (a, b)  => a + b

const go = (...args) => reduce((a, f) => f(a), args)
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs)
const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._)

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

/*
  같은 데이터를 가지고 두가지 일을 하는 아래 두 코드가 있는데 중복코드가 많다.
  이렇게 파이프라인으로 만들어진 코드를 중복 제거를 해봅시다.
*/
const totalPrice = pipe( // 중복된 부분을 pipe 함수를 사용하여 1차 처리.
  map(p => p.price),
  reduce(add))

const baseTotalPrice = predi => pipe( // 중복되면서 조금 다르게 동작하는 부분을 보조함수를 이용하여 2차 처리.
  filter(predi),
  totalPrice)

go(
  products,
  baseTotalPrice(p => p.price < 20000),
  console.log)

go(
  products,
  baseTotalPrice(p => p.price >= 20000),
  console.log)

/*
  함수형 프로그래밍에서는 고차함수들을 함수의 조합으로 만들어 나가며 중복을 제거하고, 더 많은 곳에서 사용할 수 있게 만들어 나가는 것이다.
*/