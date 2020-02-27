const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
]
/*
  # map
*/
// 상품명을 모아보고 싶을 떄
let names = []
for (const p of products) {
  names.push(p.name)
}
console.log(names)
// 상품가격을 모아보고 싶을 떄 
let prices = []
for (const p of products) {
  prices.push(p.price)
}
console.log(prices)
// map 사용시
const map = (f, iter) => {
  let res = []
  for (const a of iter) {
    res.push(f(a))
  } 
  return res // 함수형 프로그래밍은 인자와 리턴값으로 소통하는 방식이기에 여기에서 console.log를 하는게 아니라 일단 return하거 그 이후에 동작을 취하는 것을 권장한다.
}
console.log(map(p => p.name, products))
console.log(map(p => p.price, products))

/*
  # 이터러블 프로토콜을 따르는 map의 다형성 (다형성이 굉장히 높다)
*/

//document.querySelectorAll 은 Array를 상속받은 것이 아니기 떄문에 map이 없어 아래의 코드가 안먹힌다
// console.log(document.querySelectorAll('*').map(el => el.nodeName)) 

// 그런데 위에서 우리가 만든 map 함수는 먹힌다. 왜냐하면 document.q-A이 이터러블 프로토콜을 따르고, map 함수 역시 for...of 문으로 만들어졌기 떄문입니다.
console.log(map(el => el.nodeName, document.querySelectorAll('*')))
const it = document.querySelectorAll('*')[Symbol.iterator]()
console.log(it.next())
console.log(it.next())
console.log(it.next())
// 아래와 같은 것에도 map 함수를 사용할 수 있다.
function *gen() {
  yield 2
  if (false) yield 3
  yield 4
}
console.log(map(a => a * a, gen()))
// 그러니 내장된 map 메서드보다 위의 map 함수가 다형성이 좋다. 

let m = new Map()
m.set('a', 10)
m.set('b', 20)
// const it = m[Symbol.iterator]() 이거 당연히 가능하고
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
console.log(map(([k, a]) => [k, a * 2], m)) // 값이 ['a', 10] 같이 배열로 들어오기에 구조분해를 하여 [k, a]로 값을 받을 수 있고
console.log(new Map(map(([k, a]) => [k, a * 2], m))) // 이렇게 다시 Map 객체화