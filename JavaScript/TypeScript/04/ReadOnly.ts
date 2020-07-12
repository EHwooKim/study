// readonly

class Foo3 {
  private readonly MAX_LEN: number = 5 // 선언 시 또는
  private readonly MSG: string

  constructor() {
      this.MSG = 'Hello' // 생성자 내부에서만 값 할당 가능
  }

  log() {
    // this.MAX_LEN = 10 // readonly라서 재할당이 안된다
    // this.MSG = 'hi' // readonly라서 재할당이 안된다

    console.log(`MAX_LEN: ${this.MAX_LEN}`) // 읽기만 가능하다
    console.log(`MSG: ${this.MSG}`)
  }
}

new Foo3().log()