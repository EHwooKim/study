const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
]
/*
  # reduce
  - 값을 하나의 값으로 축약해나가는 함수
*/

const nums = [1, 2, 3, 4, 5]
// reduce 안쓰고 일반적인 코드로
let total = 0
for (const n of nums) {
  total = total + n
}
console.log(total)


const reduce = (f, acc, iter) => {
  if (!iter) { // 초기값 acc를 안주었을 때. 인자로 두개만 들어올 테니 iter를 못찾겠지
    iter = acc[Symbol.iterator]() // 이터러블 값을 이터레이터로 바꿔주고
    acc = iter.next().value // 초기값을 next()를 이용하여 설정해주고 두번쨰 값부터 계산되도록.
  }
  for (const a of iter) {
    acc = f(acc, a)
  }
  return acc
}

const add = (a, b) => a + b

console.log(reduce(add, 0, [1, 2, 3, 4, 5])) //함수, 시작값, 배열
console.log(add(add(add(add(add(0, 1), 2), 3), 4), 5)) // 와 같이 재귀적으로 누적해나가는 방식

console.log(reduce(add, [1, 2, 3, 4, 5])) // 내장된 reduce는 초기값 acc 를 받지 않아도 되는데 이 경우 내부적으로
console.log(reduce(add, 1, [2, 3, 4, 5])) // 이와같은 형태로, 첫번쨰 값을 초기값으로 변경한다.

// reduce는 보조함수를 통해 어떻게 축약해 나갈지를 결정하기에 단순 배열외에 더 복잡한 이터러블에 대해서도 계산이 간편하다.

console.log(reduce((totalPrice, product) => totalPrice + product.price, 0, products))