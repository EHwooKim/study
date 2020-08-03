# 목차

* [함수](#함수)

* [this](#this)

* [Math](#Math)

* [Class](#Class)

* [Date](#Date)

* [Promise](#Promise)

  

# 함수

함수는 `일급 객체`이므로 아래와 같은 특징이 있다. [일급객체](./일급객체.js)

```	
1. 무명의 리터럴로 표현하는 것이 가능하다.
2. 변수나 자료구조(객체, 배열)에 저장할 수 있다.
3. 함수의 파라미터로 전달할 수 있다.
4. 반환값(return value)으로 사용할 수 있다.
```

## 01. 함수 정의

* 함수 선언문
* 함수 표현식
* Function 생성자 함수

### 1. 함수 선언문

```javascript
function square(number) {
    return number * number
}
```

### 2. 함수 표현식

* 함수의 일급 객체 특성을 이용하여 함수를 변수에 할당할 수 있다.

```javascript
var square = function(number) {
    return number * number
}
```

> 함수 표현식 방식으로 정의한 함수는 함수명을 생략하는 것이 일반적이다.

* `기명 함수` 형태로 함수를 정의할 경우 **함수가 할당된 변수를 사용해 함수를 호출하지 않고 기명 함수의 함수명을 사용해 호출하게 되면 에러가 발생한다.** 이는 함수 표현식에서 사용한 함수명은 **외부 코드에서 접근이 불가능**하기 때문이다. => `재귀적 호출`시에만 함수명을 통한 호출이 가능하다.
* :lipstick:**함수 선언문**으로 정의함 함수는 **함수명**으로 호출할 수 있었는데, **자바스크립트 엔진에 의해 아래와 같은 함수 표현식 형태로 변경되기 때문이다.**

```javascript
var square = function square(number) {
    return number * number
}
```

### 3. Function 생성자 함수

* 함수 표현식과 함수 선언문 모두 결국 리터럴 방식으로 함수를 정의하는데 **이것은 결국 내장 함수 Function 생성자 함수로 함수를 생서하는 것을 단순화시킨 short-hand이다**

```javascript
new Function(arg1, arg2, ... argN, functionBody) // Function 생성자 함수의 구조

var square = new Function('number', 'return number * number')
```

* 일반적으로 Function 생성자 함수로는 함수를 생성하지 않는다

## 02. 함수 호이스팅

함수의 3가지 `정의 방식` 모두 **결국 Function 생성자를 통해 함수를 생성한다**. 하지만 `동작 방식`에서는 약간의 **차이가 있다**

### 1. 함수 선언문 - 함수 호이스팅

```javascript
var res = square(5)
function square(number) {
    return number * number
}
```

* `함수 선언문`으로 함수가 정의되기 전에 함수 호출이 가능하다.
* **자바스크립트는 ES6의 let, const를 포함한 모든 선언**`(var, let, function, function*, class)`**을 호이스팅한다.**
* `호이스팅`이란 var, function과 같은 모든 선언문이 해당 `Scopre`의 선두로 옮겨지는 것처럼 동작하는 특성이다.
* `함수 선언문`으로 정의된 함수는 자바스크립트 엔진이 스크립트가 로딩되는 시점에 초기화하고 VO(variable object)에  저장한다. 즉, **함수 선언, 초기화, 할당이 한번에 이루어진다.**

### 2. 함수 표현식 - 변수 호이스팅

```javascript
var res = square(5) // TypeError: square is not a function
var square = fnction(number) {
    return number * number
}
```

* `함수 표현식`의 경우 함수 호이스팅이 아닌 :lipstick:**변수 호이스팅**:lipstick:이 발생한다.

```
변수 호이스팅은 변수 생성 및 초기화 할당이 분리되어 진행된다. 호이스팅된 변수는 undefined로 초기화 되고 실제값의 할당은 할당문에서 이루어진다!
```

> 함수 표현식은 함수 선언문과는 달리 스크립트 로딩 시점에 변수객체(VO)에 함수를 할당하지  않고 runtime에 해석되고 실행된다.

### 3. 함수 표현식 > 함수 선언문

이러한 `호이스팅 문제`와  `변수 객체에 너무 많은 변수 저장시 응답속도를 떨어뜨리는 문제`떄문에 **함수 표현식**을 사용할 것을 권고한다.

## 03. 생성자 함수

* 자바스크립트에서 `함수`는 재사용 가능한 코드를 생성하는 것 외에도 **객체를 생성하기 위한 방법**으로도 사용된다.
* 이떄, 직접 객체를 `return`해도 되지만 `new` 키워드와 함께 함수를 호출하면 **`retuen` 없이도 새로운 객체가 반환되며 이를 `생성자함수`라 합니다.**
* :lipstick: 생성자 함수를 만들 때 `화살표 함수`를 사용할 수 **없습니다.**:lipstick:

* 모든 객체는 `contructor` 속성을 가지며 이 속성은 객체를 만든 `생성자 함수`를 가르킵니다.

> [생성자 함수](./생성자함수.js)

### 1. 생성자 함수 동작 방식

```
1. 빈 객체 생성
2. 생선된 객체에 this 할당
3. 생성자 함수의 코드를 실행 (thos에 속성 및 메소드 추가)
4. 만든 빈 객체의 __proto__에 생성자 함수의 prototype 속성을 대입
5. this를 생성자의 반환값으로 변환.
```

### 2. 객체 리터럴 방식과의 차이

```javascript
// 객체 리터럴 방식
var foo = {
    name: 'jyg',
    gender: 'male'
}
console.dir(foo) // { name: 'jyg', gender: 'male' }

// 생성자 함수 방식
function Person(name, gender) {
    this.name = name
    this.gender = gender
}
var me = new Person('Kim', 'male')
console.dir(me) // Person { name: 'Kim', gender: 'male' }
```

* `객체 리터럴 방식`과 `생성자 함수 방식`의 차이는 **프로토타입 객체([[Prototype]])**
  * `객체 리터럴 방식`의 경우, 생성된 객체의 프로토타입 객체는 `Object.prototype`이다.
  * `생성자 함수 방식`의 경우, 생성된 객체의 프로토타입 객체는 `Person.prototype`이다.

### 3. 생성자 함수 보완하기

* `arguments.callee`를 활용하여 `new` 키워드 없이 사용된 생성자 함수를 보완한다.
  * `callee`  : `arguments`객체의 프로퍼티로서 함수 바디 내에서 현재 실행중인 함수를 참조할 떄 사용한다. 즉, **현재 실행중인 함수의 이름을 반환한다.**
  * `this` 가 호출된 함수(callee)의 인스턴스가 아니면 `new` 연산자를 사용하지 않은 것이므로 `new`와 함께 생성자함수를 호출하여 인스턴스를 반환하는 방법으로 `생성자 함수`를 보완한다.

```javascript
function Person(name, age) {
    if (!(this instanceof arguments.callee)) {
        return new arguments.callee(name, age)
    }
    this.name = name
    this.age = age
}
let k = new Person('k', 30)
let j = Person('j', 27)
console.log(k.name) // k
console.log(j.name) // j
```

# this

`this`는 함수가 선언될 떄가 아닌 **함수가 호출 될 때**에 따라 바인딩할 객체가 동적으로 결정된다.

> 함수가 어디에 선언되었는지에 따라 스코프가 결정되는 렉시컬 스코프와 헷갈리지 말자 (자바스크립트는 렉시컬 스코프를 따른다)

* `전역 객체`는 `전역 스코프`를 갖는 `전역 변수`를 프로퍼티로 소유한다. 글로벌 영역에서 선언한 함수는 전역객체의  프로퍼티로 접근할 수 있는 **전역 변수의 메소드**이다.

```javascript
const foo = () => {
    console.log('invoked')
}
window.foo(); // 전역객체 window의 프로퍼티로 접근.
```

## 01. 함수 호출

* 기본적으로 `this`는 **전역 객체에 바인딩** 된다. 전역함수는 물론이고 **내부함수**의 경우도 `this`는 외부 함수가 아닌 **전역객체에 바인딩된다.**

```javascript
const foo = () => {
    console.log(this) // window
    const bar = () => {
        console.log(this) // window
    }
    bar()
}
foo()
```

* **메소드의 내부함수**일 경우에도 `this`는 **전역객체에 바인딩 된다**

```javascript
var value = 1
var obj = {
    value: 100,
    foo: function() {
        console.log(this, this.value)  // obj, 100
        function bar() {
            console.log(this, this,value) // window, 1
        }
        bar()
    }
}
obj.foo()
```

* **콜백함수**의 경우에도 `this`는 **전역객체에 바인딩 된다.**

```javascript
var value = 1
var obj = {
    value: 100,
    foo: function() {
        setTimeout(function() {
            console.log(this, this.value) // window, 1
        }, 100)
    }
}
obj.foo()
```

<hr/>

**내부함수는 일반 함수, 메소드, 콜백함수 어디에서 선언되었든 관계없이 this는 전역객체를 바인딩한다.**

내부함수의 `this`가 전역객체를 참조하는 것을 회피하는 방법은 아래와 같다. ( that 변수 생성 )

```javascript
var value = 1
var obj = {
    value: 100,
    foo: function() {
        var that = this
        console.log(this, this.value) // obj, 100
        function bar() {
            console.log(this, this.value)  // window, 1
            console.log(that, that.value)  // obj, 1
        }
        bar()
    }
}
obj.foo()
```

## 02. 메소드 호출

* 함수가 객체의 프로퍼티 값이면 `메소드`로서 호출된다. 이때 메소드 내부의 `this`는 **해당 메소드를 소유한 객체에 바인딩된다.**

```javascript
var obj1 = {
    name: 'Joeng',
    sayName: function() {
        console.log(this.name)
    }
}
var obj2 = {
    name: 'Kim'
}
obj2.sayName = obj1.sayName
obj1.sayName()  // Joeng
obj2.sayName()  // Kim
```

* 프로토타입 객체도 메소드를 가질 수 있다. 프로토타입 객체 메소드 내부에서 사용된 `this`도 일반 메소드와 마찬가지로 **해당 메소드를 호출한 객체에 바인딩된다.**

## 03. 생성자 함수의 this

* `생성자 함수`는 **new 키워드 유무에 따라 생성자 함수, 일반 함수로 각각 호출된다.**
  * **생성자 함수**로 호출 시 `this`는 **생성자 함수가 암묵적으로 생성한 빈 객체에 바인딩** 
  * **일반 함수**로 호출 시 `this`는 **전역 객체**에 바인딩된다.

```javascript
function Teacher(name, age) {
    this.name = name
    this.age = age
}
const jay = new Teacher('jay', 30)
console.log(jay) // Teacher {name: "jay", age: 30}
console.log(jay.age) // 30

const jay2 = Teacher('jay', 30)
console.log(jay2) // undefined
console.log(age) // 30
```



# Math

## 01. Property

### 1. PI

* PI 값 반환.

## 02. Method

### 1. abs

* 인수의 절대값을 반환한다.

```javascript
Math.abs(-1);       // 1
Math.abs('-1');     // 1
Math.abs('');       // 0
Math.abs([]);       // 0
Math.abs(null);     // 0
Math.abs(undefined);// NaN
Math.abs({});       // NaN
Math.abs('string'); // NaN
Math.abs();         // NaN
```

### 2. round, ceil, floor

* `round` - **반올림**한 정수 반환

```javascript
Math.round(1.4);  // 1
Math.round(-1.4); // -1
```

* `ceil` - **올림**한 정수를 반환

```javascript
Math.ceil(1.4);  // 2
Math.ceil(-1.4); // -1
```

* `Math` - **내림**한 절수를 반환

```javascript
Math.floor(1.9);  // 1
Math.floor(-1.9); // -2
```

### 3. max, min

* `max` - **최대값**을 반환

```javascript
Math.max(1, 2, 3)
// 배열 요소 중 최대값
const arr = [1, 2, 3]
const max = Math.max.apply(null, arr) // 3 
// ES6 활용
Math.max(...ar) // 3
```

* `min` - **최소값**을 반환

```javascript
Math.min(1, 2, 3); // 1
// 배열 요소 중 최소값
const arr = [1, 2, 3];
const min = Math.min.apply(null, arr); // 1
// ES6 Spread operator
Math.min(...arr); // 1
```

### 4. pow, sqrt

* `pow`  - **거듭제곱값**을  반환

```javascript
Math.pow(2, 8) //256
Math.pow(2, -1) // 0.5
```

* `sqrt` - **제곱근**을 반환

```javascript
Math.sqrt(9) // 3
Math.sqrt(-9) // NaN
```

## 03. 난수 생성

```javascript
const makeRandomNumber = (min, max) => {
    return Math.floor(Math.random * (max - min + 1)) + min
}
```

* `round`가 아닌 `floor`로 해야 0과 1까지도 나올 확률이 동일해진다.

# Class

* `자바스크립트`는 `프로토타입 기반` 객체지향 언어이다. ES5에서는 생성자 함수와 프로토 타입, 클로저를 사용하여 객체 지향 프로그래밍을 구현하였다. 

## 01. 클래스 정의

* [생성자 함수](./클래스/01.js) vs [클래스](./클래스/02.js)

* 클래스는 선언이전에 참조할 수 없다.

  ```javascript
  console.log(Foo) // ReferenceError
  class Foo {}
  ```

  > 클래스는 var 키워드가 아닌 let, const키워드로 선언한 변수처럼 호이스팅 된다. 
  >
  > 따라서 클래스 선언문 이전에 일시적 사각지대(Temporal Dead Zone; TDZ)에 빠지기 때문에 호이스팅이 발생하지 않는 것처럼 동작한다.

* `class` 역시 var, let, function와 같은 선언문이고 모든 선언문은 호이스팅 된다

  ```javascript
  const Foo = 'Kim'
  {
      console.log(Foo) // 뭐가 출력될까?
      class Foo {}
  }
  ```

  > class가 호이스팅되지 않는다면  Kim이 출력되어야 하지만 호이스팅 되기 때문에 참조에러가 발생한다.

## 02. 인스턴스 생성

* `생성자 함수`와 마찬가지로 `new` 연산자와 함꼐 클래스를 호출하면 `인스턴스`가 생성된다.

  ```javascript
  class Foo {}
  const foo = new Foo()
  ```

  > 이떄 new와 함께 호출한 Foo는 클래스 이름이 아닌 constructor(생성자)이다. 
  >
  > 표현식이 아닌 선언식으로 정의한 클래스의 이름은 constructor와 동일하다.

  ```javascript
  console.log(Object.getPrototypeOf(foo).constructor === Foo) // trues
  ```

* `new` 연산자를 사용하지 않고 `constructor`를 호출하면 에러가 발생한다.

## 03. constructor

* `constructor`는 인스턴스를 생성하고 클래스 필드를 초기화하기 위한 특수한 메소드이다.

  ```text
  - 클래스 필드(class field)
  클래스 내부의 캡슐화된 변수를 말한다. 데이터 멤버 또는 멤버 변수라고도 부른다.
  클래스 필드는 인스터스의 프로퍼티 또는 정적 프로퍼티가 될 수 있다.
  자바스크립트의 생성자 함수에서 this에 추가한 프로퍼티를 클래스 기반 객체지향 언어에서는 클래스필드라고 부른다.
  ```

* 인스턴스를 생성할 때 new 연산자와 함께 호출한 것이 바로 `constructor`이며 constructor의 파라미터에 전달한 값은 클래스 필드에 할당한다.

  ```javascript
  class Foo { } //constructor는 생략할 수 있다. 
  // constructor를 생략하면 클래스에 `constructor() {}`를 포함한 것과 동일하게 동작한다. 
  
  const foo = new Foo();
  console.log(foo); // Foo {}  - 즉, 빈 객체를 생성한다. 
  
  // 따라서 인스턴스에 프로퍼티를 추가하려면 인스턴스를 생성한 이후, 프로퍼티를 동적으로 추가해야 한다.
  foo.num = 1; 
  console.log(foo); // Foo&nbsp;{ num: 1 }
  ```

* constructor는 인스턴스의 생성과 동시에 클래스 필드의 생성과 초기화를 실행한다. 따라서 클래스 필드를 초기화해야 한다면 constructor를 생략해서는 안된다.

## 04. 클래스 필드

* 클래스 몸체(class body)에는 **메소드만 선언할 수 있다.** 클래스 바디에 클래스 필드(멤버 변수)를 선언하면 문법 에러(SyntaxError)가 발생한다.

  ```javascript
  class Foo {
    name = ''; // SyntaxError - 클래스 바디에 멤버 변수 선언불가
    			 // 클래스 필드의 선언과 초기화는 반드시 constructor 내부에서 실시한다.
    constructor() {}
  }
  ```

## 05. getter, setter

> [코드](./클래스/03.js)

### 1. getter

* `getter`는 클래스 필드에 **접근**할 때마다 클래스 필드의 값을 조작하는 행위가 필요할 떄 사용한다.
* `get`키워드와 함께 사용되며 이떄 정의한 메소드 이름은 **클래스 필드 이름처럼** 사용된다.
  * 즉 getter는 Foo()와 같이 호출하는 것이 아닌 참조하는 형식으로 사용한다.
* `getter`는 이름 그대로 무언가를 **취득할 때** 사용하므로 반드시 무언가를 반환해야 한다.

### 2. setter

* `setter`는 클래스 필드에 값을 **할당**할 때마다 클래스 필드의 값을 조작하는 행위가 필요할 때 사용한다. 
* `set`키워드와 함께 사용되며 **클래스 필드 이름처럼** 사용된다.

## 06. 정적 메소드

> [코드](./클래스/04.js)

* `static` 키워드와 함께 `정적 메소드`를 정의할 수 있다.
* `정적 메소드는 ` 클래스의 인스턴스가 아닌 **클래스의 이름**으로 호출한다. 따라서 인스턴스를 생성하지 않아도 호출할 수 있다. 
* 일반 메소드안에서의 `this`는 인스턴스를 가르킨다. 그런데 `정적 메소드`는 인스턴스로 호출을 할수 없다. **즉, 정적 메소드 안에서 this를 못쓴다.**
* 정적 메소드는 `Math 객체`의 메소드처럼 애플리케이션 전역에서 사용할 유틸리티(utility) 함수를 생성할 때 주로 사용한다.

## 07. 클래스 상속

> [코드](./클래스/05.js) 

### 1. extends

	* `extends` 키워드는 부모 클래스(base class)를 상속받는 자식 클래스(sub class)를 정의할 때 사용한다.

| 방법                    | 설명                                                         |
| ----------------------- | ------------------------------------------------------------ |
| 오버 라이딩(Overriding) | 상위 클래스가 가지고 있는 메소드를 하위 클래스가 재정의하여 사용하는 방식 |
| 오버로딩(Overloading)   | 이름은 같지만 매개변수의 타입 또는 갯수를 다르게 설정하여 메소드를 구별하여 호출하는 방식 |

* 자바스크립트는 오버로딩을 지원하지 않는다

### 2. super 

* `super`키워드는 부모 클래스를 참조할 때 또는 부모 클래스의 constructor를 호출할 때 사용한다.
* 자식 클래스의 `constructor`에서 `super()`를 호출하지 않으면 this에 대한 참조 에러(ReferenceError)가 발생한다.

### 3. static 메소드와 prototype 메소드의 상속

[프로토타입 공부 다시하고 읽어보자..](https://poiemaweb.com/es6-class#83-static-메소드와-prototype-메소드의-상속)

# Date

`Date`객체는 `빌트인 객체`이면서 `생성자 함수`이다. 

Date 생성자 함수로 생성한 Date 객체는 내부적으로 숫자값을 갖는다. 이 값은 1970년 1월 1일 00:00(UTC)을 기점으로 현재 시간까지의 밀리초를 나타낸다.

## 01. Date Constructor

### 1. new Date()

인수를 전달하지 않으면 **`현재 날짜와 시간`**을 가지는 `인스턴스`를 반환한다.

### 2. new Date(milliseconds)

인수로 숫자 타입의 밀리초를 전달하면 UTC를 기점으로 전달된 밀리초만큼 경과한 날짜와 시간을 가진 `인스턴스`를 반환한다.

```javascript
const date = new Date(86400000) // 86400000 = oneDay
console.log(date) // Fri Jan 02 1970 09:00:00 GMT+0900 (한국 표준시)
```

### 3. new Date(dateString)

인수로 날짜와 시간을 나태는 문자열을 전달하면 지정된 날짜와 시간을 가지는 `인스턴스`를 반환한다.

이때 인수로 전달한 문자열은 `Date.parse`메소드에 의해 해석 가능한 형식이어야 한다.

```javascript
let date = new Date('May 16, 2019 17:22:10');
console.log(date); // Thu May 16 2019 17:22:10 GMT+0900 (한국 표준시)

date = new Date('2019/05/16/17:22:10');
console.log(date); // Thu May 16 2019 17:22:10 GMT+0900 (한국 표준시)
```

### 4. new Date(year, month [, day, hour, minute, second, millisecond])

인수로 년, 월, 일, 시 , 분, 초, 밀리초를 의미하는 숫자를 전달하면 지정된 날짜와 시간을 가지는 `인스턴스`를 반환한다.  이때 **년, 월은 반드시 지정하여야 한다.**

:lipstick: `month`의 경우 0월부터 시작하는 것에 주의하자. (year, day를 제외하고는 모두 0부터 시작한다)

```javascript
let date = new Date(2019, 4); // month가 0부터 시작함에 주의하자!!
console.log(date); // Wed May 01 2019 00:00:00 GMT+0900 (한국 표준시)
```

### 5. Date 생성자 함수를 new 연산자 없이 호출

Date 생성자 함수를 `new`연산자 없이 호출하면 **인스턴스를 반환하지 않고** 결과값을 **문자열로** 반환한다.

```javascript
let date1 = new Date()
console.log(typeof date1, date) //object Sat Aug 01 2020 20:24:47 GMT+0900 (대한민국 표준시)
let date2 = Date()
console.log(typeof date2, date2) //string Sat Aug 01 2020 20:24:47 GMT+0900 (대한민국 표준시)
```

## 02. Date Method

### 1. Date.now

UTC를 기점으로 현재 시간까지 경과한 **밀리초**를 숫자로 반환한다.

```javascript
const now = Date.now()
console.log(now) // 1596339005432
```

### 2. Date.parse

UTC를 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환한다.

`new Date(Srting)` 때 인수와 동일한 형식의 인수를 사용해야한다.

```javascript
d = Date.parse('Jan 2, 1970 09:00:00'); // KST
console.log(d); // 86400000
```

### 3. Date.UTC

Date.parse와 동일하게 UTC를 기점으로 경과된 시간을 밀리초 숫자로 반환한다.

Date.parse와 다른 점은 `new Date(year, month[, day, hour, minute, second, millisecond])` 와 같은 형식의 인수를 사용해야 한다는 점이다.

```javascript
let d = Date.UTC(1970, 0, 2);
console.log(d); // 86400000

d = Date.UTC('1970/1/2');
console.log(d); // NaN
```

**month의 경우 0 ~ 11 까지의 정수임에 주의하자.**

### 4. Date.prototype.getFullYear

년도를 나타내는 4자리 숫자를 반환한다.

```javascript
const today = new Date() // Date 객체의 메소드이니 문자열을 반환하는 Date()에는 안먹히지
const year = today.getFullYear()
console.log(year) // 2020
```

### 5. Date.prototype.setFullYear

년도를 나타내는 4자리 숫자를 **설정**한다. 년도 이외 월, 일도 설정할 수 있다.

```javascript
dateObj.setFullYear(year[, month[, day]])
```

```javascript
const today = new Date()
today.setFullYear(1991) // today에서 년도만 1991로 바뀐다.
today.setFullYear(1991, 6, 07) // today에서 년, 월, 일이 1991. 07. 07로 바뀐다.
```

### 6. Date.prototype.getMonth & setMonth

`getMonth` - 월을 나타내는 **0** ~ 11의 정수를 반환한다.

`setMonth` - 월을 나타내는 **0** ~ 11의 정수를 설정한다. 월 이외 일도 설정할 수 있다.

### 7. Date.prototype.getDate & setDate

`getDate` - 날짜를 나타내는 1 ~ 31의 정수를 반환한다.

`setDate` - 날짜를 타나내는 1 ~31의 정수를 설정한다.

### 8. Date.prototype.getDay

요일을 나타내는 0 ~ 6의 정수를 반환한다. (일요일 ~ 토요일)

### 9. 시간과 관련된 메소드

> 전체적인 사용법은 getFullYear, setFullyear와 동일하다.

`getHours`, `setHours` - 시간을 반환, 설정한다. (분, 초, 밀리초도 설정 가능)

`getMinutes`, `setMinutes` - 분을 반환, 설정한다. (초, 밀리초도 설정 가능)

`getSeconds`, `setSeconds` - 초를 반환, 설정한다. (밀리초도 설정 가능)

`getMilliseconds`, `setMilliseconds` - 밀리초를 반환, 설정한다.

`getTime`, `setTime` - UTC 기점으로 현재 시간까지 경과된 밀리초를 반환, 설정한다.

### 10. Date.prototype.getTimezoneOffset

UTC와 local time의 차이를 분단위로 반환한다.

```javascript
const today = new Date()
const x = today.getTimezoneOffset() // -540
console.log(x / 60) // -9 즉, UTC에 9시간을 더한 시간이다.
```

### 11. Date.prototype.toDateString & toTimeString

사람이 읽을 수 있는 형식의 문자열로 날짜 & 시간 을 반환한다.

```javascript
const date = new Date()
console.log(typeof date, date) // object 2020-08-02T04:26:40.432Z

console.log(date.toString()) // Sun Aug 02 2020 13:26:40 GMT+0900 (GMT+09:00)
console.log(date.toDateString()) // Sun Aug 02 2020
console.log(date.toTimeString()) // 13:26:40 GMT+0900 (GMT+09:00)
```

# Promise

## 00. 비동기처리

아래 코드의  결과를 예상해보자.

```javascript
function get(url) {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {        
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) { 
            console.log( 'response', xhr.response); // 1
            return xhr.response; 
        } else { 
            console.log('Error: ' + xhr.status);
        }
    };


    xhr.open('GET', url);

    xhr.send();
}
const res = get('http://jsonplaceholder.typicode.com/posts/1');
console.log('res', res); // 2
```

>res undefined
>
>response {
>  "userId": 1,
>  "id": 1,
>  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
>  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
>}

XMLHttpRequest는 api요청만 보낼뿐이지 비동기 처리를 알아서 해주는게 아니다. 

## 01. 프로미스 생성

프로미스는 `Promise 생성자 함수`를 통해 인스턴스화 한다.

`Promise 생성자 함수`는 비동기 작업을 수행할 **콜백 함수**를 인자로 전달받는데 이 **콜백 함수**는 `resolve`와 `reject` **함수**를 인자로 전달받는다.

```javascript
const promise = new Promise((resolve, reject) => {
    if ('성공했을시') {
        resolve('result') /// resolve 함수 실행
    } else { // 실패했을시
        reject('fail') // reject 함수 실행
    }
})
```

Promise는 비동기 처리가 `성공(fulfilled)`하였는지 `실패(rejected)`하였는지 등의 상태 정보를 갖는다.

| 상태      | 의미                                   | 구현                                               |
| --------- | -------------------------------------- | -------------------------------------------------- |
| pending   | 비동기 처리가 아직 수행되지 않은 상태  | resolve 또는 reject 함수가 아직 호출되지 않은 상태 |
| fulfilled | 비동기 처리가 수행된 상태 (성공)       | resolve 함수가 호출된 상태                         |
| rejected  | 비동기 처리가 수행된 상태 (실패)       | reject 함수가 호출된 상태                          |
| settled   | 비동기 처리가 수행된 상태 (성공or실패) | resolve 또는 reject 함수가 호출된 상태             |

Promise 생성자 함수가 인자로 전달받은 콜백 함수는 내부에서 비동기 처리 작업을 수행한다. 이때 비동기 처리가 성공하면 콜백함수의 인자로 전달받은 resolve 함수를 호출한다. 이때 프로미르는 'fulfilled' 상태가 된다. 비동기 처리가 실패하면 reject 함수를 호출한다. 이때 프로미스는 reject 상태가 된다. 

Promise를 사용하여 비동기 함수를 정의해보자.

```javascript
const promiseAjax = (method, url, payload) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.setRequestHeader('Content-type', 'allicatipn/json')
    xhr.send(JSON.stringify(payload))

    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return

      if (xhr.status >= 200 && xhr.status < 400) {
        resolve(xhr.response)
      } else {
        reject(new Error(xhr.status))
      }
    }
  })
}
```

위 예제처럼 비동기 함수 내에서 Promise 객체를 생성하고 그 내부에서 비동기 처리를 구현한다. 이때 비동기 처리에 성공하면 resolve 메소드를 호출한다. 이때 resolve 메소드의 인자로 비동기 처리 결과를 전달한다. 이 처리 결과는 Promise 객체의 후속처리 메소드로 전달된다. 만약 비동기 처리에 실패하면 reject 메소드를 호출한다. 이때 reject 메소드의 인자로 에러 메시지를 전달한다. 이 에러 메시지는 Promise 객체의 후속 처리 메소드로 전달된다.

## 02.  프로미스의 후속 메소드

Promise로 구현된 비동기 함수는 **Promise 객체를 반환하여야 한다.**  Promise로 구현된 비동기 함수를 호출하는측 (promise consumer)에서는 Promise 객체의 후속 처리 메소드(then, catch)를 통해 비동기 처리 결과 또는 에러 메시지를 전달받아 처리한다. Promise 객체는 상태를 갖는다고 하였따. 이 상태에 따라 후속 처리 메소드를 체이닝 방식으로 호출한다. Promise의 후속 처리 메소드는 아래오 같다.

```
then
then 메소드는 두 개의 콜백 함수를 인자로 전달 받는다. 첫 번째 콜백 함수는 성공 (fulfilled)시 호출되고 두 번째 함수는 실패(reject)시 호출된다.
then 메소드는 Promise를 반환한다.!!

catch
예외(비동기 처리에서 발생한 에러와 then메소드에서 발생한 에러)가 발생하면 호출된다. 
catch 메소드는 Promise를 반환한다.
```

위에서 정의한 promiseAjax 함수를 써보자

```javascript
promiseAjax('GET', 'http://jsonplaceholder.typicode.com/posts/1')
    .then(JSON.parse)
    .then(
    render,
    console.error
)
```

## 03. 프로미스의 에러 처리

프로미스의 에러처리는 **then 메서드의 두 번째 콜백 함수로 처리**할 수도 있고 **catch 메서드로 처리**할 수도 있다.

```javascript
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

promiseAjax(wrongUrl)
  .then(res => console.log(res), err => console.error(err)); // Error: 404
```

> 부적절한 URL이 지정되어 에러가 발생하고, then 메서드의 두번째 콜백에서 처리하게 된다.

```javascript
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

promiseAjax(wrongUrl)
  .then(res => console.log(res))
  .catch(err => console.error(err)); // Error: 404
```

> 위와 동일한 에러가 발생하며 catch 메서드를 통해 에러를 처리하게 된다.

`catch 메서드`를 호출하면 내부적으로 `then(undefined, onRejected)`를 호출한다. 위 예제는 내부적으로 다음과 같이 처리된다.

```javascript
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

promiseAjax(wrongUrl)
  .then(res => console.log(res))
  .then(undefined, err => console.error(err)); // Error: 404
```

단, then 메서드의 두 번째 콜백 함수는 첫 번째 콜백 함수에서 발생한 에러를 캐치하지 못하고 코드가 복잡해져서 가독성이 좋지 않다.

```javascript
promiseAjax('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => console.xxx(res), err => console.error(err));
  // 두 번째 콜백 함수는 첫 번째 콜백 함수에서 발생한 에러를 캐치하지 못한다.
```

:lipstick: 따라서 then 메서느 내부에서 발생한 에러를 잡기 위해, 가독성을 위해 프로미스 에러 처리는 `catch`를 통해 하자!! :lipstick:

## 04. 프로미스 체이닝

비동기 함수의 처리 결과를 가지고 다른 비동기 함수를 호출해야 하는 경우 프로미스는 후속 처리 메소드를 `체이닝(chaining)`하여 여러 개의 프로미스를 연결하여 사용할 수 있다.

Promise 객체를 반환한 비동기 함수는 프로미스 후석 처리 메서드인 then이나 catch 메소드를 사용할 수 있다. 따라서 then 메소드가 Promise를 반환하도록 하면 여러개의 프로미스를 연결하여 사용할 수있다.

**그런데 then 메소드는 기본적으로 Promise를 반환하기에 더욱 편하게 체이닝할 수 있다**

```javascript
const url = 'http://jsonplaceholder.typicode.com/posts'

promiseAjax('GET', `${url}/1`)
    .then(res => promiseAjax('GET', `${url}?userId=${JSON.parse(res).userId}`))
    .then(JSON.parse)
    .then(render)
    .catch(console.error)
```

## 05. 프로미스의 정적 메소드

### 1. Promise.resolve, Promise.reject

`Promise.resolve`와 `Promise.reject` 메소드는 존재하는 값을 Promise로 래핑하기 위해 사용한다.

각각 인자로 전달된 값을 resolve, reject하는 Promise를 생성한다.

* Promise.resolve

```javascript
const resolvePromise = Promise.resolve([1, 2, 3])
resolvePromise.then(console.log) // [1, 2, 3]
```

위 예제는 아래와 동일하게 동작한다

```javascript
const resolvePromise = new Promise(resolve => resolve([1, 2, 3]))
resolvePromise.then(console.log) // [1, 2, 3]
```

* Promise.reject

```javascript
const rejectPromise = Promise.reject(new Error('Error!'))
rejectPromise.catch(console.log)
```

위 예제는 아래와 동일하게 동작한다

```javascript
const rejectPromise = new Promise((resolve, reject) => reject(new Error('Error!')))
rejectPromise.catch(console.log) // [1, 2, 3]
```

### 2. Promise.all

`Promise.all` 메소드는 프로미스가 담겨있는 배열 등의 `이터러블`을 인자로 받는다. 그리고 전달받은 모든 프로미스를 **병렬**로 처리하고 그 처리 결과를 resolve하는 **새로운 프로미스를 반환한다.**

```javascript
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), 
  new Promise(resolve => setTimeout(() => resolve(2), 2000)),
  new Promise(resolve => setTimeout(() => resolve(3), 1000))
]).then(console.log) // (3초 후) [1, 2, 3]
.catch(console.log)
```

Promise.all 메소드는 전달받은 모든 프로미스를 **병렬**로 처리한다. 이때 모든 프로미스의 처리가 종료될 때까지 기다린 후 모든 처리 결과를 resolve 또는 reject한다.

* 모든 프로미스의 처리가 성공하면 **각각의 프로미스가 resolve한 처리 결과를 배열에 담아 resolve하는 새로운 프로미스를 반환한다.** 이때 첫번째 프로미스가 가장 나중에 처리되어도 첫번째 프로미스의 결과가 먼저 배열에 담겨 반환된다. 즉, **처리 순서가 보장된다**
* 프로미스의 처리가 하나라도 실패하면 **가장 먼저 실패한** 프로미스가 reject한 에러를 reject하는 새로운 프로미스를 즉시 반환한다.

```javascript
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 1!')), 3000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 2!')), 2000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 3!')), 1000))
]).then(console.log)
  .catch(console.log); // Error: Error 3!
```

위 예제의 경우, 세번째 프로미스가 가장 먼저 실패하므로 세번째 프로미스가 reject한 에러가 catch 메소드로 전달된다.

Promise.all 메소드는 전달 받은 이터러블의 요소가 프로미스가 아닌 경우, Promise.resolve 메소드를 통해 프로미스로 래핑된다.

```javascript
Promise.all([
  1, // => Promise.resolve(1)
  2, // => Promise.resolve(2)
  3  // => Promise.resolve(3)
]).then(console.log) // [1, 2, 3]
  .catch(console.log);
```

* 예제

```javascript
const githubIds = ['jeresig', 'ahejlsberg', 'ungmo2'];

Promise.all(githubIds.map(id => fetch(`https://api.github.com/users/${id}`)))
  // [Response, Response, Response] => Promise
  .then(responses => Promise.all(responses.map(res => res.json())))
  // [user, user, user] => Promise
  .then(users => users.map(user => user.name))
  // [ 'John Resig', 'Anders Hejlsberg', 'Ungmo Lee' ]
  .then(console.log)
  .catch(console.log);
```

> fetch를 통해 얻은 데이터를 사용하기 위해서는 .json()의 과정이 필요하다
>
> .json()역시 프로미스를 반환하므로 Promise.all을 한번 더 사용해준 것이다.

### 3. Promise.race

Promise.all 메서드와는 다르게 가장 먼저 resolve, reject된 결과만 가지고 행동한다.

```javascript
Promise.race([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(console.log) // 3
  .catch(console.log);
```

