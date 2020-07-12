class Foo4 {
  static instanceCounter = 0
  constructor() {
    // 생성자가 호출될 때마다 카원터를 1씩 증가시킨다.
    Foo4.instanceCounter++ // 클래스로부터 호출한다.
  }
}
var f1 = new Foo4()
var f2 = new Foo4()
var f3 = new Foo4()

console.log(Foo4.instanceCounter)
// console.log(f3.instanceCounter) // 에러 - 인스턴스에서 호출안된다.