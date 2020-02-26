/*
  ## 전개 연산자
  - 전개 연산자 역시 이터러블/이터레이터 프로토콜을 따르고 있다.
*/

const a = [1, 2]
console.log(...a) 
// a[Symbol.iterator] = null     // Symbol.iterarot를 null로 바꾸면 아래 코드가 안먹힌다.
console.log([...a, ...[3, 4]])   // 전개연산자 역시 이터러블 프로토콜을 따르고 있는 값들을 펼칠 수 있는 것이다.
// ...arr, ...set, ...map, ...map.keys(), 등 모두 사용이 가능하다.