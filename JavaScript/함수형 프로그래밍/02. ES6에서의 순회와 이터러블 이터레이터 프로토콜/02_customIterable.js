/*
  ### 사용자 정의 이터러블을 통해 알아보기
*/

const iterable = {
  [Symbol.iterator]() {       // Symbol.iterator 메서드를 구현하고 있어야하고
    let i = 3
    return {                  // 그것은 iterator를 반환해야하는데
      next() {                // iterator 는 next를 메서드로 가지고 있으며
        return i == 0 ? { done: true } : { value: i--, done: false }// next는 value와 done을 가지고 있는 객체를 리턴해야 합니다.
      },
      [Symbol.iterator]() { return this }   // 저 밑에서 말한 잘 정의된 이터러블, 이터레이터가 되기 위한 코드 => 자기 자신을 리턴하는 Symbol.iterator
    }
  }
}
let iterator = iterable[Symbol.iterator]()
// console.log(iterator)
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())//  이게 가능할 것이고

for (const a of iterator) console.log(a) // 잘 정의되기 전에는 이 코드는 실행이 안된다.
                                         // 잘 정의가 되어야, 즉 이터레이터도 이터러블이 되어야 위 코드가 실행된다.

for (const a of iterable) console.log(a) // iterable은 Symbol.iterator가 구현되어있기 때문에 for...of 문 사용이 가능하다.
// 여기까지 구현한 것은 js의 이터러블/이터레이터 프로토콜의 모든 것을 구현한 건 아니지.

// const arr2 = [1, 2, 3]                // 배열과 같이 잘 구현된 이터러블은 
// let iter2 = arr2[Symbol.iterator]()
// iter2.next()                          // 이렇게 한단계를 진행시키고
// console.log(iter2[Symbol.iterator] )      // iter2도 Symbol.iterator를 가지고 있고, 그것을 실행시킨 값은 자기 자신이다. 이렇게 이터레이터가 자기자신을 반환하는 Symbol.iterator를 메서드를 가지고 있을 때 잘 정의된 이터러블, 이터레이터라고 할 수 있다.
// for (const a of iter2) console.log(a)  // 다음 단계부터 이어서 진행이 가능하다.



/*
  이터러블/이터레이터 프로토콜은 ES6에서 지원하는 내장 값만 이것을 따르는게 아니라
  오픈소스 라이브러리나 js에서 순회가 가능한 것들은 대부분은 이 프로토콜을 따르기 시작했다.
  예를 들어 facebook에서 만든  Immutable.js 같은 것들이 그러하다.
  오픈소스뿐만 아니라 js가 사용되고 있는 환경인, 브라우저에서 사용할 수 있는 web APIs에 구현된 많은 것들이 역시 이 프로토콜을 따르고있다.
*/
for (const a of document.querySelectorAll('*')) console.log(a) // 이게 가능한 이유는 배열이라서가 아니라 이터러블/이터레이터 프로토콜을 따르고 있기 때문이다.
const all = document.querySelectorAll('*')
console.log(all[Symbol.iterator])
console.log(all[Symbol.iterator]())
let iter3 = all[Symbol.iterator]()
console.log(iter3.next())
console.log(iter3.next())
console.log(iter3.next())

