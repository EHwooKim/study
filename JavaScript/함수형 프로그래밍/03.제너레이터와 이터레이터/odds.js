/*
  제너레이터를 통해 홀수만 발생시키는 이터레이터를 만들어 순회하는 예제
*/

function *infinity(i = 0) { // 0혹은 넘겨준 값부터 1씩 무한히 증가시켜주는 제너레이터
  while (true) yield i++    // 이것을 이용해 홀수만 뽑아보자.
}
function *limit(n, iter) {
  for ( const a of iter ) {
    yield a
    if (a === n) return 
  }
}
function *odds(n) {
  for ( const a of limit(n, infinity(1)) ) {
    if (a % 2) yield a
  }
}
let iter2 = odds(10)
console.log(iter2.next())
console.log(iter2.next())
console.log(iter2.next())
console.log(iter2.next())
console.log(iter2.next())
console.log(iter2.next())

for (const a of odds(40)) console.log(a)

/*
  제너레이터는 이터러블/이터레이터 프로토콜을 따르기 떄문에
  for...of, 전개 연산자, 구조 분해, 나머지 연산자 등 JS에서 이터러블 프로토콜을 따르고 있는 문법 또는 라이브러리들과 잘 사용될 수 있다.
*/

// for...of는 지금까지 많이 보여줬고

console.log(...odds(10))
console.log([...odds(10), ...odds(20)])

const [a, b, ...rest] = odds(10)
console.log(a)
console.log(b)
console.log(rest)