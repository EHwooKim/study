interface IPerson {
  name: string;
  sayHello(): void;
}

class Person implements IPerson {
  // 인터페이스에서 정의한 프로퍼티 반드시 구현
  constructor (public name: string) {}
  // 인터페이스에서 정의한 추상 메소드 반드시 구현
  sayHello() {
    console.log(`Hello ${this.name}`)
  }
}

const greeter = (person: IPerson): void => {
  person.sayHello()
}

const me = new Person('Kim')
greeter(me) // Hello Kim