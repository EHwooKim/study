# Vue(웹게임)

## 01. 구구단

### Math

* Math.ceil(n) : n 이상의 숫자 중에서 가장 작은 수. 소수점 이하를 올림한 정수

  ```javascript
  Math.ceil(1.4) // 2
  Math.ceil(1.6) // 2
  Math.ceil(-1.4) // -1
  Math.ceil(-1.6) // -1
  ```

* Math.floor() : n 이하의 숫자 중에서 가장 큰 수. 소수점 이하를 내림한 정수

  ```javascript
  Math.floor(1.9) // 1
  Math.floor(9.1) // 9
  Math.floor(-1.9) // -2
  Math.floor(-9.1) // -10
  ```

* Math.random() : 0`이상` 1`미만`의 부동소수점 반환

*  1이상 9 이하의 임의의 숫자 뽑기

  ```javascript
  // Math.random() * 9 로 0.x ~ 8.x 의 숫자를 생성하고
  // Math.ceil()로 소수점 이하를 올림하여 1 ~ 9 숫자를 반환.
  Math.ceil(Math.random() * 9)
  ```

### preventDefault

* `preventDefault()` : submit의 기본 기능인 화면 새로고침을 하지않는다.

### ref, focus

* `submit`후에 `input form` 바로 포커싱 되어 답 입력 편하게 하기.

  * 데이터가 아닌 태그에 직접 접근해야한다.

  * `ref`, `focus()` 활용!

    ```html
    <input ref="answer">
    
    <script>
        ...
        this.$refs.answer.focus()
        ...
    </script>
    ```

    > 편리한 방법이라고 남용하지 말자. 특히 ref를 이용하여 값을 변경시킬 경우 데이터 자체가 변하는 것이 아니기 때문에 주의!

