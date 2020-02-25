// 문자열 순환하기 for---of
const str = 'hello'

for (const item of str) {
    console.log(item)
}

const iter = str[Symbol.iterator]() // 반복 가능한 객체이기 때문에 Symbol.iterator 메소드를 갖고 있습니다.
console.log(iter.next())            // Symbol.iterator 메소드를 호출하면 반복자가 반환됩니다.
console.log(iter.next())            // 이 반복자의 next 메소드를 호출하면서 반환된 value 값이 콘솔로 출력됩니다.
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())