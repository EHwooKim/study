# 목차

* [설치 및 기본 설정](#설치-및-기본-설정)
* [타입 선언](#타입-선언)
* [정적 타이핑](#정적-타이핑)
* 



# 설치 및 기본 설정

> [Poiemaweb](https://poiemaweb.com/)

* 설치 

  ```bash
  $npm i -g typescript
  ```

* 버전 확인

  ```bash
  $tsc -v
  ```

  > 앞으로 typescript 실행 명렁어는 tsc.

* 실행

  ```bash
  # person.ts 파일 작성 후.
  $tsc person
  ```

  * tsc 명렁어 뒤에 트랜스파일링 대상 파일명을 지정하면 같은 디렉터리에 js 파일이 생성된다.

  * 컴파일 옵션에  `--target` 혹은 `-t`를 사용하면  해당 버전의 js 파일로 트랜스파일링된다.

    ```bash
    $tsc person -t ES2015
    ```

* tsc 옵션 설정

  ```bash
  $tsc --init
  ```

  > 옵션 설정을 위한 파일인 tsconfig.json이 생성된다.

  * `tsconfig.json` 파일 생성 후, **tsc 명령어 뒤에 파일명을 지정하면 tsconfig.json이 무시되기에 **tsc 명령어만 사용한다.

    ```bash
    $tsc person
    ```

    > tsconfig.json이 무시된다.

    ```bash
    $tsc
    ```

    > 폴더 내의 모든 TypeScript 파일이 tsconfig.json에 맞게 모두 트랜스파일링된다.
    
  * 파일 내용이 변경되었을 떄 자동으로 트랜스파일링 하는방법

    ```bash
    $ tsc --watch 
    ```

    또는

    ```javascript
    // tsconfig.json - 옵션추가
    {
      // ...
      "watch": true
    }
    
    ```

  * 컴파일러 옵션 - [문서 참고](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
  
* [외부 라이브러리 사용을 위한 TypeScript Definition 설치](https://poiemaweb.com/typescript-vscode#4-외부-라이브러리의-사용을-위한-typescript-definition-설치)

  ```bash
  $ npm install lodash --save
  ```

  > 라이브러리만 설치했을 때는 VScode에서 제공하는 Type에 대한 안내를 받아볼 수 없었다

  ```bash
  $ npm install @types/lodash --save-dev
  ```

  > 해당 라이브러리의 정의 파일을 설치하면 VScode 기능이 활성화된다.

  

# 타입 선언

* `TypeScript`는 `ES5`, `ES6`의 `Superset`이므로 **자바스크립트의 타입**을 그대로 사용할 수 있다.

* 원시 타입 (primitive data type)

  - `boolean` - true, false
  - `null` - 값이 없음을 명시
  - `undefined` - 값을 할당하지 않은 변수의 초기값
  - `number` - 숫자(정수, 실수, Infinity, NaN)
  - `string` - 문자열
  - `symbol` - 고유하고 수정 불가능한 데이터타입. 주로 객체 프로퍼티들의 식별자로 사용 (ES6에서 추가)

* 객체 타입 (object/reference type)

  - `object`

* `TypeScript` 고유의 타입

  * `array` - 배열
  * `tupple` - 고정된 요소수 만큼의 타입을 미리 선언후 배열을 표현
  * `enum` - 열거형, 숫자값 집합에 이름을 지정한 것
  * `any` - 타입 추론(type inference)를 할 수 없거나 타입 체크가 필요없는 변수에 사용. 어떤 타입의 값도 할당 가능
  * `void` - 일반적으로 함수에서 반환값이 없을 경우 사용한다.
  * `never` - 결고 발생하지 않는 값

* [타입 선언 예시](./03/type.ts)

* 그 외에도 객체의 유형 역시 타입이 될 수 있다.

  ```javascript
  let primiteveStr: string;
  primiteveStr = 'hello'; // OK
  primiteveStr = new String('hello'); // Error
  ```

  > 원시타입인 string을 할당하고 생성자 함수로 생선된 String 래퍼 객체 타입 할당하니 에러

  ```javascript
  let objectStr: String;
  objectStr = 'hello'; // OK
  objectStr = new String('hello'); // OK
  ```

  > 하지만 String 타입에는 string, String 모두 할당 가능

  ```javascript
  // 그 외에도 아래왙은 객체 유형들도 타입이 될 수 있다.
  const today: Date = new Date(); // Date 타입
  
  const elem: HTMLElement = document.getElementById('myId'); // HTMLElement 타입
  
  class Person { }
  // Person 타입
  const person: Person = new Person();
  ```

  

 # 정적 타이핑

* `동적 타이핑` - JavaScript는 변수에 값이 할당되는 과정에서 동적으로 타입을 추론(Type Inference)을 한다.
* `정적 타이핑` - C-family와 같이 변수에 할당할 값의 타입을 사전에 명시적으로 선언해야하며 해당 타입에 맞는 값을 할당하여야한다. `TypeScript`역시 정적 파이핑을 지원한다.

# 타입 추론

* 타입 선언을 생략하면 값이 할당되는 과정에서 동적으로 타입이 결정되고 이를 `타입 추론`이라 한다.

* `자바스크립트`의 경우 동적 타이핑을 지원하기에 타입을 선언하지 않아도 되며 하나의 변수에 여러 타입의 값들이 들어갈 수 있다.

* `타입스크립트`의 경우 `타입 추론`에 의해 타입이 결정되면 다른 타입을 할당할 수 없다.

  ```typescript
  let foo = 123  // 타입 선언이 없어 타입 추론에 의해 number 타입이 되고
  foo = 'h1' // error. 한번 타입이 결정되면 다른 타입은 할당하지 못한다.
  ```

* 선언, 할당 모두 하지 않을 경우 `any`타입이 된다. 이 경우 자바스크립트 변수와 똑같아지기 떄문에 타입스크립트의 장점을 없애는 것과 같기에 사용하지 않는 편이 좋다.

  ```typescript
  let foo // let foo: any와 동치
  foo = 'hello'
  foo = 123 // 정상 작동
  ```

  