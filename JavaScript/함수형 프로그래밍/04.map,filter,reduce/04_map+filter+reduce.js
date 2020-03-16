const fx = require('./fx')

const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
]

console.log(fx.map(product => product.price, products)) // 가격만 출력
console.log(fx.map(product => product.price, fx.filter(product => product.price < 20000, products)))  // map 사용, 20000미만 가격만 출력위해 products를 filter로 축약해줬다.
const add = (a, b)  => a + b
console.log(
  fx.reduce(
    add, 
    fx.map(product => product.price, 
      fx.filter(product => product.price < 20000, products)))) // 그것들의 합
      // 길어서 복잡해보이지만, 오른쪽에서 왼쪽으로 읽어 나가보자
console.log(
  fx.reduce(
    add, 
    fx.filter(price => price < 20000, 
      fx.map(product => product.price, products)))) // 같은 값이 나오는 다른 방법. 
