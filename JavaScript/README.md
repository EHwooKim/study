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

## 스코프체인

> 함수 안에 함수를 선언한 중첩 함수에서 자식 함수가 부모 함수의 변수에 어떻게 접근 가능한지에 대해 알아보자.

* 스코프체인 - 문자 그대로 스코프가 연결되어 있음을 뜻한다.

### 실행 컨텍스트, 렉시컬 환경

* `실행 컨텍스트(Execution Context)` - 코드가 실행되기 위해 필요한 정보를 가지고 있으며 실행 가능한 코드가 실행될 때 생성된다. 대표적인 실행 가능한 코드로는 `전역 코드`와 `함수 코드`가 있다. (eval과  모듈 코드도 있다)
* `렉시컬 환경(Lexical Environment)` - 







> > 

#### JSON  - 잠시 뺴놓습니다..

> JSON(JavaScript Object Notation)

* `객체`와 `JSON`은 형태는 비숫해 보여도 동일하지 않다.
* `JSON`의 `key`는 반드시 큰따옴표 `" "`로 표시된 문자열이어야 한다.

