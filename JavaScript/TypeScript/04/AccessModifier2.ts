// 생성자 내부에서 접근 제한자 사용

class Foo2 {
  // 접근 제한자가 선언된 생성자 파라미터 x는 클래스 프로퍼티로 선언되고 자동으로 초기화된다.
  constructor(public x: string) {}
}

const foo2 = new Foo2('hello')
console.log(foo2)
console.log(foo2.x)

class Bar2 {
  constructor(private x: string) {}
}

const bar2 = new Bar2('bye')
console.log(bar2)
console.log(bar2.x) // private 선언을 했기 떄문에 클래스 내부에서만 참조 가능하다.