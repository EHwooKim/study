const log = console.log

/*
  ## ES6 이전의 리스트 순회
  - for i++
*/
const list = [1, 2, 3]
for (var i = 0; i < list.length; i++) { // 배열의 길이에 의존한 순회
  log(list[i])
}
const str = 'abc'
for (var i = 0; i < str.length; i++) { // 유사배열 역시 비슷한 방법.
  log(str[i])
}

/*
  ## 기존과 달라진 ES6에서의 리스트 순회
  - for of
*/
for (const a of list) {
  log(a)
}
for (const a of str) {
  log(a)
}

/*
  ### Array를 통해 알아보기
*/
log('Arr ----------')
const arr = [1, 2, 3]
for (const a of arr) log(a)
// Array의 경우 arr[0], arr[1]와 같이 키값으로 접근이 가능하다
// 하지만, Set과 Map은 arr[0], arr[1]로 접근이 불가능하다. 그렇기 떄문에 for of 문이 내부적으로 for i++ 형태로 되어있지 않다는 것을 의미한다.
// ES6에 Symbol.iterator 라는것이 추가되었는데 어떤 객체의 키로 사용될 수 있다.
log(arr[Symbol.iterator]) // 어떤 함수가 출력된다
// arr[Symbol.iterator] = null // 이렇게 Symbol.iterator로 접근 가능하던 값을 null로 바꾸고 for of 를 다시 해보면 순회가 안된다.
let iter1 = arr[Symbol.iterator]()
iter1.next()
iter1.next()
for (const a of iter1) log(a) // 한번만 출력된다.


/*
  ### Set을 통해 알아보기
*/ 
log('Set ----------')
const set = new Set([1, 2, 3])
for (const a of set) log(a)


/*
  ### Map을 통해 알아보기
*/
log('Map ----------')
const map = new Map([['a', 1], ['b', 2], ['c', 3]])
for (const a of map) log(a)
for (const a of map.keys()) log(a) // map.keys() 메서드는 MapIterator를 반환한다. 이터레이터니까 당연히 next()메서드가 있겠지!
for (const a of map.values()) log(a) 
for (const a of map.entries()) log(a) 
// 이때
let it = map.values() // 이 이터레이터로 만든 것이
it[Symbol.iterator] // 다시 심볼.이터레이터를 가지고있어 
let it2 = it[Symbol.iterator]() // 이때 자기 자신을 그대로 리턴하도록 되어있다.
it2.next() // 그래서 values로 만든 이터레이터 사용이 가능한 것이다.

/* 
  ## 이터러블 / 이터레이터 프로토콜
  - 이터러블: 이터레이터를 리턴하는 [Symbol.iterator]() 메서드를 가진 값
  - 이터레이터: { value, done }이라는 키에 해당하는 값을 가지고있는 객체를 리턴하는 next() 메서드를 가진 값
  - 이터러블/이터레이터 프로토콜: 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록한 규약
*/
//arr[Symbol.iterator]
//let iterator = arr[Symbol.iterator]
//iterator.next()  // 을 찍어보면 value와 done이 있다, done이 true가 될때까지 next()가 호출되며 value값을 순회하는 것이다.