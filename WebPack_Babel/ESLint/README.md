# ESLint

`ESLint`는 ECMAScript코드에서 문제점을 검사하고 더 나은 코드로 정정하는 Lint의 도구 중 하나로,  `JSLint` -> `JSHint`를 거쳐 최근에는 `ESLint`를 많이 사용한다.

* `ESLin`의 역할
  * 포맷팅 - 들여쓰기, 전체 줄 길이 제한 등
  * 코드 품질 - 코드의 잠재적인 오류를 예방

* 설치 및 실행

  ```bash
  $ npm i eslint
  ```

  ```javascript
  // app.js 생성
  console.log()
  (function() {})()  // console.log()의 결과인 undefined(funciton() {})() 의 형태라 에러
  ```

  ```bash
  $ npx eslint app.js
  ```

  **바로 실행을 해보면, 아래와 같은 에러가 발생한다.**

  ![lintError](https://user-images.githubusercontent.com/52653793/96075314-bc09f180-0ee5-11eb-9b40-dabf49a769ea.png)

  > ESLint는 기본적으로 configuration 파일이 필요하다.

* 설정파일 (.eslintrc.js)

  ```javascript
  // .eslintrc.js
  modudule.exports = {
  }
  ```

  > 이제 위의 에러는 더이상 발생하지 않는다. ( 설정 내용이 없기때문에 실행 결과도 없는 상태 )

  ```javascript
  // .eslintrc.js
  modudule.exports = {
    rules: {
        
    }
  }
  ```

  * `rules` - 코드를 검사하는 규칙, [공식문서](https://eslint.org/docs/rules/)에서 확인해보자

  ```javascript
  // .eslintrc.js
  module.exports = {
    rules: {
      "no-unexpected-multiline": "error"
    }
  }
  ```

  > no-unexpected-multiline 규칙에 어긋나는 규칙이 있으면 error를 발생시킨다.

* 다시 `eslint`를 실행해보자.

  ![rules](https://user-images.githubusercontent.com/52653793/96075793-c8427e80-0ee6-11eb-82d1-8ab2bbd1af2d.png)

  이렇게 규칙에 어긋나는 코드에 대해 에러가 발생한다.

* `no-extra-semi `rules, `-fix` 옵션

  ```javascript
  // app.js
  console.log();;;;
  (function() {})()
  ```

  ```javascript
  // .eslinrc.js
  module.exports = {
    rules: {
      "no-unexpected-multiline": "error",
      "no-extra-semi": "error",  // 추가 
    }
  }
  ```

  ```bash
  $ npx eslint app.js
  ```

  ![semiError](https://user-images.githubusercontent.com/52653793/96076149-9978d800-0ee7-11eb-8073-954f51c3fc4b.png)

  에러가 발생하고, `--fix` 옵션에 대한 설명이 있다.

  ```bash
  $ npx eslint app.js --fix
  ```

  ```javascript
  // app.js
  console.log();  // --fix 옵션과 함께 실행하니 불필요한 코드가 제거되었다.
  (function() {})()
  ```

  ![image](https://user-images.githubusercontent.com/52653793/96076271-e8bf0880-0ee7-11eb-92a3-ac5801156989.png)

  위 사진과 같이 렌치 표시가 있는 규칙들은 `--fix` 옵션을 사용할 수 있다.

## Extensible Config

필요한 규칙들을 하나씩 추가할 수도 있지만, 바벨의 `preset`과 같이 필요한 규칙을 여러개 미리 정해놓은 것이 `eslint: recommended` 설정이다.  [공식문서](https://eslint.org/docs/rules/)에서 좌측에 체크표시가 된 규칙들이 이 설정에 활성화된 규칙이다.

* 설정

  ```javascript
  // .eslintrc.js
  module.exports = {
    extends: [
      "eslint:recommended"
    ],
  }
  ```

* ESLint에서 기본으로 제공하는 설정 외에 자주 사용하는 두가지

  * `airbnb` - [airbnb 스타일 가이드](https://github.com/airbnb/javascript)를 따르는 규칙 모음이다. [eslint-config-airbnb-base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base)로 제공된다.
  * `standard` - [자바스크립트 스탠다드 스타일](https://standardjs.com/)을 사용한다. [eslint-config-standard](https://github.com/standard/eslint-config-standard)로 제공된다.

## eslint --init

위 설정들은 --init 옵션으로 손쉽게 구성이 가능하다.

```bash
$ npx eslint --init
```



  # Prettier

`Prettier`는 ESLint의 역할 중 `포매팅(코드 스타일)`과 겹치는 부분이 있지만 프리티어는 좀 더 일관적인 스타일로 코드를 다듬는다. 반면 `코드품질(잠재적에러 발견)`과 관련된 기능은 하지 않는 것이 ESLint와 다른 점이다.

* 설치 및 사용

  ```bash
  $ npm i -D prettier
  ```
  
  ```bash
  $ npx prettier app.js
  ```
  
  > prettier 사용 결과가 console에 보인다.
  
  ```bash
  $ npx prettier app.js --write
  ```
  
  > --write 옵션을 사용하면 prettier 결과를 파일에 적용시킨다.

`Prettier`의 강점은 `ESLint` 가 고칠 수 없는 (--fix 옵션을 제공하지 않던) 코드 또한 고쳐준다.

```javascript
// app.js
foo(reallyLongArg(), reallyLongArg(), reallyLongArg(), reallyLongArg(), reallyLongArg(), reallyLongArg())
```

> prettier 적용 전
>
> npx prettier app.js --write

```javascript
// app.js
foo(
  reallyLongArg(),
  reallyLongArg(),
  reallyLongArg(),
  reallyLongArg(),
  reallyLongArg(),
  reallyLongArg()
);
```

> prettier 적용 후

이렇게 코드를 보다 보기 좋게 바꿔주는 역할을 한다.



# ESLint - Prettier 통합

## eslint-config-prettier

`Prettier`가 `ESLint`보다 포맷팅을 더 잘해주지만, 코드 품질은 확인하지 않기 떄문에 두가지를 모두 사용해야 한다. `Prettier`는 `ESLint`와 통합 방법을 제공한다. 

[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)는 프리티어와 충돌하는 ESLint 규칙을 **끄는** 역할을 한다. 둘 다 사용하는 경우 규칙이 충돌하기 떄문이다.

* 설치 및 설정

  ```bash
  $ npm i -D eslint-config-prettier
  ```

  ```javascript
  // .eslintrc.js
  ...
  {
      extends: [
  		"eslint:recommended",
          "eslint-config-prettier"
      ]
  }
  ```

* 사용

  ```javascript
  // 선언 후 사용하지않은 변수 - ESlint에서 처리
  var foo = '';
  
  // 중복 세미콜론 - ESLint에서는 규칙을 껐기때문에 Prettier 에서 처리
  console.log();;;;;;;
  ```

  * eslint

    ```bash
    $ npx eslint app.js --fix
    ```

    > 사용하지 않은 변수 foo에 대한 에러 발생,
    >
    > 중복세미콜론은 에러도, 변화도 없다.

  * prettier

    ```bash
    $ npx prettier app.js --write
    ```

    > 중복 세미콜론이 제거된다. 

  물론 매번 이렇게 `ESLint` 따로, `Prettier` 따로 실행시키는 것은 굉장히 불편한 작업이기 때문에 이 두 작업을 한번에 처리해주는 방법이 있다.

## eslint-plugin-prettier

[eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)는 프리티어 규칙을 **ESLint 규칙으로 추가**하는 플러그인이다.

프리티어 모든 규칙이 ESLint로 들어오기 때문에 **ESLint만 실행하면 된다.**

* 설치 및 설정

  ```bash
  $ npm i -D eslint-plugin-prettier
  ```

  ```javascript
  // .eslintrc.js
  ...
      "plugins": [
          "prettier"
      ],
      "rules": {
          "prettier/prettier": "error"
      },
  ...
  ```

* 실행

  ```bash
  $ npx eslint app.js --fix
  ```

  > eslint만 실행시키면 된다