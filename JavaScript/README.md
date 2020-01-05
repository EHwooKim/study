# part2
## 비트연산자

```javascript
150.toString(2)  // 10010110
```

> 비트 연산을 위해 이진수로 변환하는 방법입니다.
>
> 연산 자바스크립트의 .toString(2)를 활용하면 수자를 바이너리 형탤 변환할 수 있습니다.

## 자료형 변환

* 형변환 방법
  1. 개발자가 직접 명시적으로 자료형을 변환
  2. 자바스크립트 엔진에 의해 자동으로 자료형을 변환
     * 자바스크립트가 동적 자료형 언어이기 떄문에 적용되는 특징
     * 개발자가 어떤 의도로 코드를 작성해도 자바스크립트 맘대로 바꾸느니라

* `연산자`를 활용한 자료형 변환

  * `덧셈`: 대입되는 값에 따라 `숫자형` 또는 `문자형`으로 바뀐다.

    ```javascript
    var str = 5 + '1'
    console.log(str) // 51, type: string
    num = +str 
    console.log(num) // 51, type: number
    ```

  * `뺄셈`, `곱셈`, `나눗셈` : 항상 `숫자형`을 반환

    ```javascript
    console.log('5' * 2) // 10, type: number
    console.log('Five' * 2) // NaN, type: number
    ```

## 객체

### 객체 길이 구하기 - Object.keys().length

>  `배열`의 길이는 `.length` 로 간단하게 구할 수 있어 `객체`에도 동일하게 적용해보면 길이가 안나온다.

```javascript
var obj = {객체객체}
Object.keys(obj).length 
```

* Object.keys()를 하면 키가 `배열`로 반환된다.

## 비구조화 할당

### 객체 비구조화 할당

```javascript
var obj = {a:1, b:2, c: 30, d: 44, e:5}

var {a, c} = obj
console.log(`a >>> ${a}`) // a >>> 1
console.log(`c >>> ${c}`) // c >>> 30

var {a:newA=10, f:newF=5} = obj
console.log(`newA >>> ${newA}`) // newA >>> 1
console.log(`newF >>> ${newF}`) // newF >>> 5
```

1. `var {a, c} = obj`
   * 비구조화 할당을 통해 a, c를 obj에서 가져와서 할당한다.
2. `var {a:newA=10, f:newF=5} = obj`
   * `a`와 `f`를 `newA`와 `newF`라는 새로운 변수로 할당한다.
   * `obj`에 있는 `a`값인 1을 가져오고, `f`는 없으므로 기본값으로 설정한 5가 `newF`가 된다.

### 배열 비구조화 할당

```javascript
var arr = [1, 2, 30, 44, 5]

var [a=10,f=9] = [1]
console.log(`a >>> ${a}`) // a >>> 1
console.log(`f >>> ${f}`) // f >>> 9

[a, , , , , f] = [1, 2, 3, 4, 5, 6]
```

1. `var [a=10,f=9] = [1]`
   * `객체 비구조화 할당`과 마찬가지로 `기본값`을 지정해둘 수 있다.
2. `[a, , , , , f] = [1, 2, 3, 4, 5, 6]`
   * `콤마` 사이를 비워 중간 요소를 무시할 수 있다.

## Symbol

* 이름의 충돌 위험이 없는 유일한 객체의 프로퍼티 키를 만들기 위해 사용한다.
* 필요할 떄 [다시 읽어보는 거로 하자..](https://poiemaweb.com/es6-symbol)

## 예외처리

### throw
* 개발자가 의도한 에러 발생
* 고의로 에러를 발생시켜 예외 상황을 `알리는` 역할을 한다.
* `throw` 문은 예외 상황을 `미리 파악`하고 에러를 발생시켜 이후 코드가 `실행되지 않도록 합니다.`
* `throw`의 에러 발생시 코드가 멈추는 점에 대한 대응책이 `try-catch-finally`

### try-catch-finally


* 예상치 못한 에러 , 의도한 에러 모두 대응 가능.
* `try`문 안에서 발생된 에러 정보를 `catch`블록으로 전달.

  * `throw` 문에서 정의한 에러가 전달된다.
  * 예제의 경우 '유효하지 않은 값입니다.' 가 `catch`문으로 전돨된다

* `finally` 에러 여부와 상관없이 `항상` 실행.

## arguments

|          매개변수          |     전달 인자(argument)      |
| :------------------------: | :--------------------------: |
| 함수 선언 시 작성되는 변수 | 함수가 호출될 때 전달되는 값 |

* 자바스크립트는 전달 인자의 개수와 매개변수의 개수가 달라도 에러를 발생하지 **않는다.**

* 함수에서만 사용 가능한 특별한 객체를 제공하는데 그게 바로 `arguments 객체`

* `arguments 객체`는 `배열`과 유사하게 인덱스를 통해 접근이 가능하고 `length` 속성을 가지고 있지만 배열이 **아니고** 배열의 다른 속성이나 매소드를 가지고 있지 않다.

  * `인덱스`를 통한 접근이 가능하지만, 배열의 다른 메소드들을 가지고 있지 않기 떄문에 `indexOf()`와 같은 메소드를 사용하면 에러가 발생한다.

* `arguments`를 `배열` 로 바꾸는 방법

  ```javascript
  let newArr = Array.prototype.slice.call(arguments)
  ```

  * 이렇게 배열을 만들 수도 있겠지! 굳이 그럴필요는 없지만..

    ```javascript
    function list() {
        return Array.prototype.slice.call(arguments)
    }
    var myList = list(1, 2, 3, 4, 5) // [1, 2, 3, 4, 5]
    ```

    > call 에 대한 설명은 [이곳]([https://velog.io/@rohkorea86/this-%EC%99%80-callapplybind-%ED%95%A8%EC%88%98-mfjpvb9yap](https://velog.io/@rohkorea86/this-와-callapplybind-함수-mfjpvb9yap))을 참조하여 더 공부해보자.

## 기본 매개변수 (ES6)

* 함수를 정의할 때 `매개변수 = 값`을 통해 기본값을 정의해줄 수 있다.

## 나머지 매개변수 (ES6)

```javascript
function sum(...args) {
    var total = 0
    for (var i = 0; i < args.length; i++) {
        total += args[i]
    }
    console.log(args.indexOf(i))
    return total
}
```

* `arguments` 객체와 비슷하지만 `나머지 매개변수`는 `배열`이기 떄문에 `인덱스`를 통한 접근뿐 아니라 `indexOf()`와 같은 메소드 사용도 가능하다.

## 스코프 

`스코프`는 유효 범위로써 변수와 매개변수가 어디까지 유효한지를 나타낸다.

* 접근 범위에 따른 분류
  1. `전역 스코프` - 코드 어디에서든 접근 가능
  2. `함수 스코프` - 해당 함수 블록 안에서만 접근 가능

```javascript
function print() {
    var b = 20
    if (true) {
        var c = 30
    }
    console.log(c) // if문 블록 밖에서 블록 안에 있는 c에 접근했다.
    			   // var는 함수 스코프에 정의되기 때문에 print()함수 내에 있는 c에도 접근 가능
}
print()
console.log(b)	// 에러
```

* 시점에 따른 분류
  1. `렉시컬 스코프` - 코드를 작성하는 시점에 스코프가 결정되어 `정적 스코프`라고 부르며 **자바스크립트는 대표적인 렉시컬 스코프이다.**
  2. `다이나믹 스코프` 

```javascript
var a = 'global'
function print1() {
    console.log(a)
}
function print2() {
    var a = 'local'
    print1()
}
print1()
print2()
```

> 결과는 무엇일까요~?

자바스크립트는 `렉시컬 스코프`이기 때문에 코드를 **작성하는 시점**에 확정된다. 그래서 print1이 **작성**될 떄에는 이미 전역 a를 참조하고 있기 때문에 문자열 `global`이 출력된다!!

## 함수 호이스팅

> 자바스크립트에서는 함수를 선언하기 전에 호출이 가능하고 이러한 현상을 호이스팅이라고 한다.

```javascript
hello()  // 안녕하세요  - 적상 작동한다.
function hello() {
    console.log('안녕하세요')
}
```

```javascript
hello2() // 에러!!! - TypeError: hello2 is not a function
var hello2 = function() {
    console.log('안녕하세요')
}
```

* 두번째 코드는 왜 에러가 뜨고, 에러의 종류가 `TypeError`일까?
  * hello2 이름으로 선언된 변수는 호이스팅이 이루어졌다. 다만 `undefined`가 할당되었기 떄문에 **호출** 할수가 없어 `TypeError`가 뜬 것이다.
  * 호이스팅 자체가 이루어지지 않았다면 에러 종류가 `ReferenceError`로 hello2가 선언되지 않았다는 에러가 나와야 한다.

### :lipstick: 함수호이스팅 - 에러 발생의 이유

```text
호이스팅은 자바스크립트의 코드를 1.해석하고 2.실핼하는 방식 때문에 나타납니다.
간단하게 생각하면 자바스크립트는 코드를 해석하는 단계와 실행하는 단계로 나뉘고,
1.해석하는 단계에서 선언 문장을 초기화 하면서 스코프를 형성하고
2.실행하는 단계에서 값을 할당하거나 계산을 하는 행위를 한다고 볼 수 있습니다.

그렇기 때 문 에!!

해석 단계에서 hello2 변수를 선언하는 문장이 먼저 *초기화*를 하여 스코프에 hello2라는 이름에 undefined라는 값을 할당했다가
실행 단계에서 (아직 hello2에 함수가 할당되기 전에) hello2를 함수로 호출하는 바람에 Type에러가 발생하게 되는 것입니다.
```

## let

```javascript
if (true) {
    var functionScopeValue = 'global'
    let blockScopeValue = 'local'
}
console.log(functionScopeValue) // global
console.log(blockScopeValue) // ReferenceError
```

> let은 블록 단위 유효 범위를 가지게 되어 if문 밖에서 접근했을 경우 ReferenceError가 발생한다.

```javascript
let value = '바깥값'
if (true) {
    console.log(value)
    let value = '안쪽값'
}  // ReferenceError
```

> let으로 선언한 변수는 호이스팅이 블록 단위로 일어난다.
>
> 하지만 var와는 다르게 undefined값이 할당되기보다는 블록 시작부터 선언이 이루어진 라인까지 일시적으로  접근을 막는다.
>
> 블록안의 let 코드가 없었다면 위의 코드는 '바깥값'이 출력되었을 것이다.
>
> 하지만 if 블록 안에서 let으로 변수를 정의하였기 때문에 value는 if 블록문 안에 위쪽으로 호이스팅되어 실제 let으로 선언이 이루어지기 전까지 일시적으로 접근이 안 되는 영역을 만들고 그 안에서 접근을 하게 되면 에러가 발생하는 것이다.

## const

* `const`는 `let`과 마찬가지로 블록 단위 스코프를 가진다.
* `let`과는 다르게 **선언시** 값을 할당해야 하고 **재할당이 불가능하다**
* 관례적으로 변하지 않는 값을 정의하기 때문에 변수를 **대문자**로 작성한다.

```javascript
const URL = 'http://js.com'
URL = 'https://js.com' 		 // TypeError

if (true) {
    const URL2 = 'http://js.com'
}
console.log(URL2)   		 // ReferenceError
```

> **재할당이 불가능**하기 때문에 에러, **블록 단위 스코프**이기 떄문에 발생하는 에러

* `const`를 사용했다고 해서 무조건 변경이 안되는 것은 아니다.
  * `const`를 사용하여 개체를 할당했다고 하여 그 객체가 `불변 객체(Immutable Object)`가 되지는 않는다.

```javascript
const CONST_USER = {name: 'kim', age: 29}
console.log(CONST_USER.name, CONST_USER.age)  // 정상 출력

CONST_USER.name = 'tae'  
CONST_USER.age = 30
console.log(CONST_USER.name, CONST_USER.age)  // 정상 출력

CONST_USER = {name: 'woo'}  				  // TypeError
```

> const 로 정의된 CONST_USER는 불변 객체가 아니라서 각 속성에 다른 값을 할당하는 것이 가능하다.
>
> 즉, 객체의 내부 상태가 변경 가능하기 때문에 const로 배열을 선언하여도 새로운 요소를 추가하거나 변경할 수 있다.
>
> 하지만, 재할당은 불가능 하기에 새로운 객체나 배열을 재할당하려하면 에러가 발생한다.

## 스코프체인 이해하기 (이론) - 다시 좀 읽어보자...

> 함수 안에 함수를 선언한 중첩 함수에서 자식 함수가 부모 함수의 변수에 어떻게 접근 가능한지에 대해 알아보자.

* 스코프체인 - 문자 그대로 스코프가 연결되어 있음을 뜻한다.

### 실행 컨텍스트, 렉시컬 환경

> 스코프 체인을 이해하기 위해서는 `실행 컨텍스트`와 `렉시컬 환경`에 대한 이해가 필요하다.

* `실행 컨텍스트(Execution Context)` - 코드가 실행되기 위해 필요한 정보를 가지고 있으며 실행 가능한 코드가 실행될 때 생성된다. 대표적인 실행 가능한 코드로는 `전역 코드`와 `함수 코드`가 있다. (eval과  모듈 코드도 있다)
  * 처음에는 전역 코드가 먼저 실행됩니다. 이떄 `전역 컨텍스트`를 만들고 전역 코드를 순차적으로 평가합니다. 그러다 함수가 호출문을 만나면 새로운 `실행 컨텍스트`가 만들어지면서 해당 함수 실행부의 코드를 순차적으로 평가합니다. 이때 `스택`을 이용해 `실행 컨텍스트`를 관리하게 되는데, 새로운 `실행 컨텍스트`가 생성되면 스택에 쌓고 실행 중인 코드가 종료되면 해당 `실행 컨텍스트`를 스택에서 제거합니다.

```javascript
var person = 'kim'
function print() {
    var person2 = 'hong'
    function innerPrint() {
        console.log(person)
        console.log(person2)
    }
   	innerPrint()
    console.log('print finished')
}
print()
console.log('finished')
```

>kim
>
>hong
>
>print finished
>
>finished

* 위 코드에 대한 실행 컨텍스트가 실행될 떄 시간에 따라 어떻게 스택에 쌓이고 제거되는지를 확인해보자.

![043](./043.png)

* `실행 컨텍스트`는 `렉시컬 환경`을 가지고 있는데, 렉시컬 환경은 `환경 레코드(EnvironmentRecord)`와 `외부 렉시컬 환경(OuterLexicalEnvironment)`으로 구성됩니다. 실행 컨텍스트를 자바스크립트 객체 형태로 표현하면 다음과 같습니다.

  ```javascript
  ExecutionContext = {
      LexicalEnvironment: {
          EnvironmentRecord: {
              
          },
          OuterLexicalEnvironment: 참조
      }
  }
  ```

  * 실제 함수와 변수같은 식별자와 그 식별자가 가리키는 값은 키(key)와 값의 쌍르호 `환경 레코드`에 기록됩니다. 그리고 렉시컬 환경은 환경 레코드 외에 다신의 실행 환경을 감싸는 외부 실행 환경에 대한 참조를 깆고 있습니다.

* 위 코드의 실행 컨텍스트와 내부 렉시컬 환경을 그림으로 나타내면 다음과 같습니다.

![043-1](./043-1.jpg)

* 각 `식별자`는 `outerLexicalEnvironment`로 체인처럼 연결되어 있습니다. 이렇게 각 렉시컬 환경이 연결되어 있기 때문에 스코프 체인이 형성될 수 있습니다. 위 예제코드에서 스코프 체인으로 식별자를 찾는 문장을 살표보겠습니다
* innerPrint함수가 호출될 때 두 변수 person과 person2, 즉 각 식별자는 연결된 값을 자신의 실행 컨텍스트의 렉시컬 환경에서 찾습니다. 하지만 person과 person2는 innerPrint함수 내에 선언되지 않았습니다. 그러면 위 그림처럼 inner 실행 컨텍스트의 환경 레코드에는 아무런 키-값의 쌍이 없게 됩니다.
* 이렇게 자신의 실행 컨텍스트에 없으면 외부 렉시컬 환경의 참조를 통해 연결된 print 실행 컨텍스트에서 해당 식별자는 찾게 됩니다. 이때 person을 print 실행 컨텍스트의 환경 레코드에서 찾아서 'hong'을 출력하게 됩니다. 마찬가지로 person2는 전역 실행 컨텍스트까지 가서 찾아 값을 출력합니다.

## 클로저 이해하기(이론) - 다시 좀 읽어보자..

> 자바스크립트에서 클로저가 어떻게 생성되고 활용되는지

```javascript
function createCounterClosure() {
    let count = 0
    return {
        increase: function() {
            count++
        },
        getCount: function() {
            return count;
        }
    }
}

const counter1 = createCounterClosure()
const counter2 = createCounterClosure()

counter1.increase()
counter1.increase()
console.log(`counter 1의 값: ${counter1.getCount()}`)  // 2
counter2.increase()
console.log(`counter 2의 값: ${counter2.getCount()}`)  // 1
```

* `createCounterClosure()` 함수는 `객체`를 반환하는데 객체는 increase와 getCount 메소드가 있고, 모두 count 변수에 접근합니다.
* `counter`과 `counter2` 객체의 increase 메소드를 호출하면 createCounterClosure 함수 내부의 count 변수에 모두 접근합니다. 하지만 두 객체의 getCount를 호출한 결과를 보면 `counter1`과 `counter2`가 가리키는 `count`가 다른 값을 가지고 있는 것을 알 수 있습니다.
* 두 counter 객체가 다른 count에 접근하는 것은 다른 `렉시컬 환경`의 `환경 레코드`에서 count에 접근하는 것입니다. 이러한 현상이 가능한 이유는 바로 클로저 떄문입니다.

> `클로저`란 함수가 정의될 때의 렉시컬 환경을 기억하는 함수를 말합니다.

* `increase`와 `getCount` 함수가 정의될 떄의 렉시컬 환경은 `creaseCounterClosure` `실행 컨텍스트`의 `렉시컬 환경`입니다. 이 `실행 컨텍스트`는 13, 14 라인에서 각각 생성됩니다. 그래서 increase 함수와 getCOunt 함수는 createCounterClosure `실행 컨텍스트`의 `렉시컬 환경`을 기억하고 있는 `클로저`가 됩니다.
* 대체로 `실행 컨텍스트` 가 `컨텍스트 스택`에서 제거되면 해당 환경은 사라지기 마련인데 위 예제처럼 클로저가 ㅁ나들어지면 해당 환경은 사라지지 않습니다. 왜냐하면 해당 참조가 존재하기 떄문입니다(예제는 counter1과 counter2가 전역 변수에 할당되어 참조가 존재합니다.)

**이해가 잘 안되니 더 공부해보도록 합시다...**

## 객체 속성 기술자 이해하기

> 자바스크립트의 모든 객체 `속성`은 자기 자신에 대한 정보를 담고 있는 `속성 기술자`를 가지고 있고 이 속서 기술자는 객체로 표현된다.

* `getOwnPropertyDescriptor(객체, '속성')` - 속성 기술자 객체를 가져온다.
* `Object.defineProperty(객체, '속성', 옵션)` - 해당 객체의 속성을 정의한다.
  * `value` : 해당 속성의 `값`을 나타낸다.
  * `enumerable` : `for...in` 루프나 `Object.keys`메소드같이 속성을 나열할 떄 나열 가능 여부를 정의한다. false일 경우 해당 속성은 나열되지 않는다.
  * `writable` : 값을 변경할 수 있는 여부를 정의한다. false일 경우 값이 변하지 않는다.
  * `configurable` : 속성 기술자를 변경할 수 있는 여부를 정의한다. false일 경우 속성 기술자를 다시 변경할 수 없다.

* 위의 옵션처럼 **데이터에 대한 정보**를 정의하는 것 외에도 `get`, `set`을 통해 **데이터에 접근하는 방법**을 정의할 수도 있다. 

## Get, Set을 통한 속성 접근 관리하기

* `get` - 속성에 `접근`할 때 호출된다.
* `set` - 속성에 값을 대입할 때 호출된다.

```javascript
let user = {}

Object.defineProperty(user, 'age', {
    get: function () {
        return this._age
    },
    set: function (age) {
        if (age < 0) {
            console.error('0보다 작은값은 올 수 없습니다.')
        } else {
            this._age = age
        }
    },
    enumerable: true
})
user.age = 10  // user.age에 10을 대입 -> set 메소드 호출되고 user._age에 10이 할당.
console.log(user.age)  // age 속성에 접근 할때 get이 출되어 this._age가 반환되어 출력
user.age = -1  // set 메소드 호출, 0보다 작은 값을 대입하려하여 에러 발생.

let user2 = {
    get name() {  //  이렇게 객체를 정의할 때 메소드를 정의하는 메소드명 앞에 get, set 정의가능
        return this._name
    },
    set name(val) {
        if (val.length < 3) {
            throw new Error('3자 이상이어야 합니다.')
        }
        this._name = val
    }
}
user2.name = 'harin'
console.log(user2.name)
user2.name = 'han'
```

> user._age 와 같이 속성 이름 앞에 _를 붙이는 것은 암묵적으로 비공개(Private) 속성임을 나타냅니다. 자바스크립트 객체는 속성 접근 제한자가 없어서 모든 속성은 공개입니다. 그래서 대체로 이름 규칙을 통해 비공개임을 나타냅니다.

## 화살표 함수 (ES6)

> function 키워드 대신 => 연산자를 이용하여 함수를 정의할 수 있다.

* 화살표 함수 규칙
  1. 매개변수가 하나일 경우에는 인자를 정의할 떄 괄호를 생략할 수 있습니다.
  2. 매개변수가 없거나 둘 이상일 경우 괄호를 작성해야 합니다.
  3. 화살표 함수 코드 블록을 지정하지 않고 한 문장으로 작성 시 return 문을 사용하지 않아도 화살표 오른쪽 표현식의 계산 결과값이 반환됩니다.
  4. 화살표 함수 코드 블록을 지정했을 경우 반환하고 하는 값에 return 문을 작성해야 합니다. return문이 없을 시 **undefined**가 반환됩니다.
* 화살표 함수는 `arguments`객체가 만들어지지 않습니다.
  * arguments 객체가 필요한 경우 `나머지 매개변수 (...args) ` 사용을 권합니다.

## 객체지향 프로그래밍

* `객체지향 프로그래밍`이란, **프로그램을 객체들로 구성하고 객체들 간에 서로 상호작용하도록 작성하는 방법**

* 객체지향에서의 `객체`란, 식별 가능한 구체적인 사물 또는 추상적인 개념

* `객체`는 **특징적인 행동**과 **변경 가능한 상태**를 가진다.
  * 함수 값을 가지는 속성인 `메소드`가 특징적인 행동이며,
  * 그 외에 다른 값들은 변경 가능한 상태라 볼 수 있다.

```javascript
// 객체지향 프로그래밍
const teacherJay = {
    name: '제이',
    age: 30,
    teachJavascript: function(student) {
        student.gainExp()
    }
}
const studentBbo = {
    name: '뽀',
    age: 20,
    exp: 0,
    gainExp: function() {
        this.exp++
    }
}

console.log(studentBbo.exp)
teacherJay.teachJavascript(studentBbo)
console.log(studentBbo.exp)
```

> teachJavascript 메소드는 학생을 매개변수로 정의하고 있다. 즉, teacherJay 객체는 student 객체를 사용한다.

* 자바스크립트는 `프로토타입 기반`으로 객체지향 프로그래밍을 지원한다.  자바의 클래스 기반과의 큰 차이점으로 `프로토타입`으로 `객체`에 공통 사항을 적용할 수 있습니다.
* 즉, 모든 객체는 `원형(Prototype)`이 될 수 있다. 

```javascript
// 객체지향 프로그래밍 - 프로토타입
const studentProto = {
    gainExp: function() {
        this.exp++
    }
}
const harin = {
    name: '하린',
    age: 10,
    exp: 0,
    __proto__: studentProto
}
const bbo = {
    name: '뽀',
    age: 20,
    exp: 10,
    __proto__: studentProto
}
bbo.gainExp()
harin.gainExp()
harin.gainExp()
console.log(harin)
console.log(bbo)
```

> gainExp 메소드를 가지는 객체를 정의하고 다른 객체에 proto 속성으로원형 객체를 정의(연결)해준다.

* \_\_proto\_\_ 속성에 다른 객체를 할당하지 않으면 기본적으로 `Object.prototype`객체가 연결되어 있다.

## 생성자 함수 이해하기

* 자바스크립트에서 `함수`는 재사용 가능한 코드의 묶으로 사용하는 것 외에 **객체를 생성하기 위한 방법**으로도 사용됩니다.
* 객체를 생성하기 위해 직접적으로 객체를 반환해도 되지만, `new`키워드를 사용하여 함수를 호출하게 되면 **return문 없이도 새로운 객체가 반환됩니다.** 그리고 함수 바디에서 `this`키워드를 사용하여 반환되는 객체의 초기 상태와 행위를 정의할 수 있습니다.
* **생성자 함수**는 `new` 키워드를 사용하지 않으면 일반적인 함수와 동일하게 동작하며 새로운 객체를 반환하지 않습니다. 
* 그렇기 때문에 생성자 한수는 함수명을 **대문자**로 시작하는 관례를 가집니다.

```javascript
function Teacher(name, age, subject) {
    this.name = name
    this.age = age
    this.subject = subject
    this.teach = function (student) {
        console.log(`${student}에게 ${this.subject}를 가르칩니다.`)
    }
}
const jay = new Teacher('jay', 30, 'JavaScript')
console.log(jay)
jay.teach('bbo')

console.log(jay.constructor)
console.log(jay instanceof Teacher)

const jay2 = Teacher('jay', 30, 'Python')
console.log(jay2)
console.log(age)
```

* Teacher 함수는 return문이 없지만 new키워드로 인해 객체를 반환하게 된다. 이때 반환되는 새로운 객체를 가리키는 것이 this이다
* 모듣 객체는 `constructor` 속성을 가지고 이 속성은 객체를 만든 생성자 함수를 기르킨다. jay 객체는 Teacher 생성자 함수를 가리키게 된다.
* `new` 키워드를 뺴고 Teacher 함수 호출시 생성자 함수의 `this`는 **전역 객체**를 가르키게 된다. 그래서 console.log(age)에서 전역 변수 age를 참조하여 30이 출력되게 된다. 새로운 객체를 반환하지 않았기 떄문에 jay2는 undefined가 출력된다.

* 생성자 함수의 `new`호출을 통한 객체 생성 과정

  ```text
  1. 빈 객체를 만듭니다.
  2. 만든 빈 객체를 this에 할당합니다.
  3. 생성자 함수 바디의 코드를 실행합니다(this에 속성 및 메소드 추가)
  4. 만든 빈 객체의 __proto__에 생성자 함수의 prototype 속성을 대입합니다.
  5. this를 생성자의 반환값으로 변환합니다.
  ```

  









#### JSON  - 잠시 뺴놓습니다..

> JSON(JavaScript Object Notation)

* `객체`와 `JSON`은 형태는 비숫해 보여도 동일하지 않다.
* `JSON`의 `key`는 반드시 큰따옴표 `" "`로 표시된 문자열이어야 한다.

