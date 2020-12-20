/*
  # 클로저 활용 - 접근 권한 제어 (정보 은닉)

    정보 은닉은 어떤 모듈의 내부 로직에 대해 외부로의 노출을 최소화해서
    모듈간의 결합도를 낮추고 유연성을 높이고자 하는 개념.
    흔히 접근 권한에는 public, private, protected 세종류가 있는데
    public은 외부에서 접근 가능한 것이고, private는 내부에서만 사용가능하며
    외부에 노출되지 않는 것을 의미한다.

    자바스크립트는 기본적으로 변수 자체에 이러한 접근 권한을 직접 부여하도록
    설계되어있지 않지만, 그렇다고 접근 권한 제어가 불가능한 것은 아니다.
    클로저를 이용하면 함수 차원에서 public한 값과 private한 값을 구분하는 것이 가능하다.
*/

const outer = function() {
  let a = 1
  const inner = function() {
    return ++a
  }
  return inner
}
const outer2 = outer()
// console.log(outer2)
// console.log(outer2())

/*  
  outer의 실행결과인 inner함수를 실행하며 a를 불러올 수는 있지만
  outer 내부에 있는 a에 직접 접근하는 것은 불가능하다.  
*/

/*
  outer 함수를 종료할 떄 inner함수를 반환함으로써 outer함수의 지역번수 a의 값을
  외부에서도 읽을 수 있다. 이처럼 클로저를 활용하면 외부 스코프에서
  함수 내부의 변수들 중 선택적으로 일부의 변수에 대한 접근 권한을 부여할 수 있다.


  outer함수는 외부로부터 철저하게 격리된 닫힌 공간으로
  외부에서는 외부 공간에 노출돼 있는 outer라는 변수를 통해 outer 함수를 실행할 수는 있지만
  outer 함수 내부에는 어떠한 개입도 할 수 없다.
  외부에서는 오직 outer 함수가 return한 정보에만 접근할 수 있다.
  즉, return값이 외부에 정보를 제공하는 유일한 수단이다.
*/

/*
  외부에 제공하고자 하는 정보들을 모아서 return하고,
  내부에서만 사용할 정보 들은 return하지 않는 것로 접근 권한 제어가 가능하다.
  return 한 변수들은 공개멤버, 그렇지 않은 변수들은 비공개 멤버가 된다 
*/


// 아래와같은 객체를 만들어 게임을 한다고 해보자.
var car = {
  fuel: Math.ceil(Math.random() * 10 + 10),
  power: Math.ceil(Math.random() * 3 + 2),
  moved: 0,
  run: function() {
    const km = Math.ceil(Math.random * 6)
    const wateFuel = km / this.power
    if (this.fuel < wateFuel) {
      console.log('이동불가')
      return
    }
    this.fuel -= wateFuel
    this.moved += km
    console.log(`${km}km 이동, 총 ${this.moved} 이동`)
  }  
}

// console.log(car)

/*
  car 변수에 객체를 직접 할당했다.
  이 car 객체를 사람 수만큼 직접 생성하여 각자의 턴에 run을 실행하여 게임을 할수있다.
  모두가 정직하게 run 메서드만 호출한다면 이정도 코드로도 게임을 즐기기엔 충분하지만
  car 객체의 fuel, power, moved에 직접 접근하여 값을 변경하는 것이 가능하기에
  마음만 먹으면 게임을 망칠 수도있는 코드이다.
  그렇기 때문에 값을 바꾸지 못하도록 방어를 할 필요가 있는데!
  이때 사용할 수 있는 방법이 클로저를 활용하는 것이다.
  즉, !!객체가 아닌 함수로 만들고!!, 필요한 멤버만 return 하는 방법을 사용하면된다.
*/

const createCar = function() {
  // 외부에 공개되면 안되는 변수들은 return하지않고
  let fuel =  Math.ceil(Math.random() * 10 + 10)
  let power = Math.ceil(Math.random() * 3 + 2)
  let moved = 0 
  // 외부에 공개시킬 변수는 return하는 방법  
  return { // 객체를 return
    // moved를 직접 공개지않고, 조회만 가능하도록 get 키워드와 함께 return
    get moved() { 
      return moved 
    },
    run: function() {
      const km = Math.ceil(Math.random() * 6)
      const wateFuel = km / power
      if (fuel < wateFuel) {
        console.log('이동불가')
        return
      }
      fuel -= wateFuel
      moved += km
      console.log(`${km}km 이동, 남은연료 ${fuel}`)
    }
  }
}

/*
  createCar라는 함수를 실행함으로써 `객체`를 생성했다.
  fuel, power 변수는 비공개 멤버로 지정해 외부에서의 접근을 제한했고,
  moved변수는 getter만을 부여하여 읽기 전용 속성을 부여했다
  이제 외부에서는 오직 run 메서드를 실행하는 것과 현재 moved 값을 확인하는
  두 가지 동작만 할 수 있다.
  
  이제 아래 행동들 중 값을 직접 변경하려는 시도는 대부분 실패한다.
*/
const car1 = createCar()
car1.run() // 3km 이동, 남은연료 17.4
console.log(car1.moved) // 3
console.log(car1.fuel) // undefined
console.log(car1.power) // undefined

car1.fuel = 10000 
console.log(car1.fuel) // 10000 - fuel이 변한 것으로 착각할 수 있지만~?
car.run() // 1km 이동, 남은연료 17.2 - 변하지 않은 것을 확인할 수 있다.

car1.moved = 3000
console.log(car.moved) // 4

/*
  이렇게 클로저를 활용하여 값을 직접 변경하는 것을 방지하였다.
  그런데 run 메소드를 다른 내용으로 덮어씌우는 것은 여전히 가능한 상태이다.
  이는 createCar 함수에서 객체를 return하기 전에 해당 객체를 변경할 수 없게끔 조치를 취해주면된다.
  Object.freeze를 사용하면 된다~
*/

const createCar = function() {
  // 동일 코드
  const publicMembers = {
    // 동일 코드
  }
  Object.freeze(publicMembers)
  return publicMembers
}
// 이제 내부 변수들도, 객체의 메서드들도 임의로 변경하는 것이 불가능해졌다.