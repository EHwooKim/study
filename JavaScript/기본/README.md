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

# 클래스

