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







#### JSON

> JSON(JavaScript Object Notation)

* `객체`와 `JSON`은 형태는 비숫해 보여도 동일하지 않다.
* `JSON`의 `key`는 반드시 큰따옴표 `" "`로 표시된 문자열이어야 한다.

