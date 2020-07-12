// class Person {
//   constructor(name) {
//     this.name = name
//   }
//   walk() {
//     console.log(`${this.name} is walking`)
//   }
// }
// const person = new Person('Kim')
// person.walk()

class Person {
  // 클래스 프로퍼티를 사전에 선언해야 한다.
  name: string

  constructor(name:string) {
    this.name = name
  }
  walk() {
    console.log(`${this.name} is walking`)
  }
}
const person = new Person('Kim')
person.walk()