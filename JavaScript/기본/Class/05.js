// 클래스 상속

// 부모 클래스
class Circle {
  constructor(radius) {
    this.radius = radius
  }
  getDiameter() { // 원의 지름
    return 2 * this.radius
  }
  getPerimeter() { // 원의 둘레
    return 2 * Math.PI * this.radius
  }
  getArea() { // 원의 넓이
    return Math.PI * Math.pow(this.radius, 2)
  }
}

// 자식 클래스
// super가 메소드로 사용될 때, 객체로 사용될 떄가 다르게 동작함을 확인하자
class Cylinder extends Circle {
  constructor(radius, height) {
    // super 메소드는 부모 클래스의 constructor를 호출하면서 인수를 전달한다.
    super(radius)
    this.height = height
  }

  getArea() { // 원통의 넓이: 부모 클래스의 getArea 메소드를 오버라이딩하였다.
    return (this.height * super.getPerimeter()) + (2 * super.getArea())   // super 키워드는 부모 클래스(Base Class)에 대한 참조
  }
  getVolume() {
    return super.getArea() * this.height // super 키워드는 부모 클래스(Base Class)에 대한 참조
  }
}

const cylinder = new Cylinder(2, 10)
console.log('원의 지름 : ', cylinder.getDiameter())
console.log('원의 둘레 : ', cylinder.getPerimeter())
console.log('원통의 넓이 : ', cylinder.getArea())
console.log('원통의 부피 : ', cylinder.getVolume())

console.log(cylinder instanceof Cylinder)
console.log(cylinder instanceof Circle)