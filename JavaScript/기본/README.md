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

# this

`this`는 함수가 선언될 떄가 아닌 **함수가 호출 될 때**에 따라 바인딩할 객체가 동적으로 결정된다.