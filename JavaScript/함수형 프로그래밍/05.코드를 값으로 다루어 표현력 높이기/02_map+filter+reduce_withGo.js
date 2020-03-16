const fx = require('./fx')

const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
]

const add = (a, b)  => a + b
console.log(
  fx.reduce(
    add, 
    fx.map(p => p.price, 
      fx.filter(p => p.price < 20000, products)))) 

// 앞서 했던 이 코드를 go를 써서 바꿔보자.
const go = (...args) => fx.reduce((a, f) => f(a), args)

go(
  products,
  products => fx.filter(p => p.price < 20000, products),
  products => fx.map(p => p.price, products),
  prices => fx.reduce(add, prices),
  console.log)
// 코드의 양은 많아졌지만 읽기가 좀 더 편해졌...나...?
// 오른쪽에서 왼쪽으로 일던 것을 이제 위에서부터 아래러 읽을 수 있게 되었잖아!