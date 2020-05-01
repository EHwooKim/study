// 공통으로 사용되는 부분을 공유를 해보자. 
function Person(nickname, age) {
    this.nickname = nickname
    this.age = age
  }

// 생성자 함수의 prototype에 추가를 해주면 된다.
Person.prototype.introduce = function() {
    console.log(`안녕하세여 저는 ${this.nickname}이고, 나이는 ${this.age}살입니다.`)
  }
  
const person1 = new Person('일분이', 10)
const person2 = new Person('이분이', 8)

person1.introduce()
person2.introduce()
