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

    