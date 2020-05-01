// 생성자 함수 (constructor)
// 생성자 함수는 대문자로 시작
function Person(nickname, age) {
  this.nickname = nickname
  this.age = age
  this.introduce = function() {
    console.log(`안녕하세여 저는 ${this.nickname}이고, 나이는 ${this.age}살입니다.`)
  }
}

// 생성자 함수로 만들어낸 객체를 인스턴스라고 부른다
const person1 = new Person('일분이', 10)
const person2 = new Person('이분이', 8)