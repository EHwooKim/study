// 추상 클래스와 추상 메소드

abstract class Animal {

  abstract makeSound(): void // 추상 메소드, void - 반환값 없는 메소드
  // 이렇게 이름과 타입만 선언하고 자식 클래스에서 구현해준다.

  move(): void {
    console.log('radming the earth...')
  }
} 

// Animal 클래스로 직접 인스턴스를 생성할 수 없다 - 추상 클래스이기때문에
// new Animal()을 못한다는 소리

class Dog extends Animal {
  makeSound() {
    console.log('Bowwwoowowww~')
  }
}
const dog = new Dog()
dog.makeSound()
dog.move()