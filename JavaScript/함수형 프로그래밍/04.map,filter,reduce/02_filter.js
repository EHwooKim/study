const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
]
/*
  filter
*/
const filter = (f, iter) => {
  let res = []
  for (const a of iter) {
    if (f(a)) res.push(a) // 보조함수 f에게 조건을 모두 위임하는 방법.
  }
  return res
}
console.log(filter(a => a.price < 20000, products))

console.log(n => n % 2, [1, 2, 3, 4])
console.log(filter(n => n % 2, function *() {
  yield 1
  yield 2
  yield 3
  yield 4
  yield 5
} ()))