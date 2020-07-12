// 접근 제한자

class Foo {
  public x: string;
  protected y: string;
  private z: string;

  constructor(x:string, y: string, z: string) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

const foo = new Foo('x', 'y', 'z')

console.log(foo.x)
console.log(foo.y) // 에러
console.log(foo.z) // 에러

class Bar extends Foo {
  constructor(x:string, y: string, z: string) {
    super(x, y, z)
    console.log(this.x)
    console.log(this.y) // 자식 클래스에서 참조 가능
    console.log(this.z) // 자식 클래스에서 참조 불가능
  }
}