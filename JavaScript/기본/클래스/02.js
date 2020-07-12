// 01.js에서 생성자 함수, 프로토 타입으로 정의한 것을 클래스로 정의해보자

// 클래스 선언문
class Person {
  constructor(name) {
    this._name = name
  }
  sayHi() {
    console.log(`Hi, ${this._name}`)
  }
}

const me = new Person('Kim')
me.sayHi()

console.log(me instanceof Person)