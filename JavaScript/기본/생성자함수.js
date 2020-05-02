function Teacher(name, age, subject) {
    this.name = name
    this.age = age
    this.subject = subject
    this.teach = function (student) {
        console.log(`${student}에게 ${this.subject}를 가르칩니다.`)
    }
}

const joeng = new Teacher('yg', 30, 'Javascript') // new와 함꼐 호출하면 return 없이도 객체가 반환된다.
console.log(joeng)
joeng.teach('ehwoo')

console.log(joeng.constructor) // [Function: Teacher] - 모든 객체는 생성자 함수를 가르키는 constructor를 가지고 있다.
console.log(joeng instanceof Teacher) // true

const joeng2 = Teacher('yg1', 30, 'vue')
console.log(joeng2) // undefined - 생성자 함수는 return이 없기 때문에 undefined가 출력된다.
console.log(age) // 30 - new 없는 생성자 함수는 일반 함수로 호출되기 때문에 전역객체를 가르키는 this에 의해 전역변수 age가 생성된다.
