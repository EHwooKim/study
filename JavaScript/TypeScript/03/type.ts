/* 타입 선언 */

let foo: string = 'Hello'
// let foo2: string = true // 에러

// 함수 선언식
function multiply(x: number, y: number):number {
  return x * y
}

// 함수 표현식
const multiply2 = (x: number, y: number):number => x * y

console.log(multiply(10, 2))
console.log(multiply2(10, 3))

// console.log(multiply('1', 2)) //에러


let isDOne: boolean = false

let n: null = null

let u: undefined = undefined

let decimal: number = 0
let hex: number = 0xf00d
let binary: number = 0b1010
let octal: number = 0o744

let color: string = 'blue'
color = 'red'
let myName: string = 'Kim'
let greeting: string = `Hello, My name is ${myName}`

let obj: object = {}

let list1: any[] = [1, 'two', true]
let list2: number[] = [1, 2, 3]
let list3: Array<number> = [4, 5, 6] // 제네릭 배열 타입

// tuple : 고정된 요소수 만큼의 타입을 미리 선언후 배열을 표현
let tuple: [string, number] // 선언
tuple = ['hello', 2]
// tuple = [2, 'hello'] // 타입 에러
// tuple = ['hello', 2, 'hello', 2] // 크기 에러

// enum : 열거형은 숫자값 집합에 이름을 지정한 것
enum Color1 {Red, Green, Blue}
let c1: Color1 = Color1.Green
console.log(c1) // 1

enum Color2 {Red = 1, Green, Blue}
let c2: Color2 = Color2.Green
console.log(c2) // 2

enum Color3 {Red = 1, Green = 2, Blue = 4}
let c3: Color3 = Color3.Blue
console.log(c3) // 4

// any : 무엇이든 할당할 수 있다.
let notSure: any = 4
notSure = 'maybe a string instead'
notSure = false

// void : 함수에서 반환값이 없을 경우 사용
function warnUser(): void {
  console.log('this is my warning message')
}

// never : 결코 발생하지 않는 값
function infiniteLoop(): never {
  while (true) {}
}
function error(message: string): never {
  throw new Error(message)
}
