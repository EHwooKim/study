// getter, setter

class Foo {
  constructor(arr = []) {
    this._arr = arr
  }
  
  get firstElem() { // 메서드이지만 사용할 떄는 참조형태로 사용한다
    return this._arr.length ? this._arr[0] : null // 반드시 무언가를 반환해야한다.
  }
  
  set firstElem(elem) { // getter와 마찬가지로 클래스 필드 이름처럼 사용된다.
    this._arr = [elem, ...this._arr]
  }
}

const foo = new Foo([1, 2])
console.log(foo.firstElem)
foo.firstElem = 0
console.log(foo.firstElem)