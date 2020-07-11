import { Person } from './person'

class Student extends Person {
  study(): string {
    return `${this.name} is studing`
  }
}

const student = new Student('Jeong')

console.log('student')
console.log(student.sayHello())
console.log(student.study())