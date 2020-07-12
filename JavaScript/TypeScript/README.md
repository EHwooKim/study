# 목차

* [설치 및 기본 설정](#설치-및-기본-설정)
* [타입 선언](#타입-선언)
* [정적 타이핑](#정적-타이핑)
* [클래스](#클래스)



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


# 클래스

* `JavaScript`의 클래스와 유사하지만 몇 가지 `TypeScript`만의 고유 확장 기능이 있다.

## 01. 클래스 정의

* [ES6 클래스](https://poiemaweb.com/es6-class#4-멤버-변수)는 클래스 몸체에 메소드만을 포함할 수 있다. 클래스 몸체에 클래스 **프로퍼티를 선언할 수 없고** 반드시 생성자(`constructor`) 내부에서 클래스 프로퍼티를 선언하고 초기화한다.

* :lipstick:**하지만! Typescript 클래스는 클래스 몸체에 클래스 프로퍼티를 `사전 선언`하여야 한다.**:lipstick:

  ```javascript
  class Person {
      consctuctor(name) {
          this.name = name
      }
      walk() {
          console.log(`${this.name} is walking`)
      }
  }
  ```

  > 위 코드는 js에서는 정상작동하는 올바른 코드이지만 ts로 바꾸어 실행하면 에러가 발생한다!

  ```typescript
  class Person {
    // 클래스 프로퍼티를 !!사전 선언!!하여야 한다
    name: string;
  
    constructor(name: string) {
      this.name = name;
    }
  
    walk() {
      console.log(`${this.name} is walking.`);
    }
  }
  ```

## 02. 접근 제한자

> [코드](./04/AccessModifier.ts)

* `TypeScript`는 클래스 기반 객체 지향 언어가 지원하는 접근 제한자(Access modifier)를 지원한다.
* 단, 접근 제한자를 명시하지 않았을 때, 다른 클래스 기반 언어의 경우, 암묵적으로 protected로 지정되어 패키지 레벨로 공개되지만 `Typescript`의 경우, 접근 제한자를 생략한 클래스 프로퍼티와 메소드는 암묵적으로 `public`이 선언된다.
* 따라서 public으로 지정하고자 하는 멤버 변수와 메소드는 접근 제한자를 생략한다.

| 접근 가능성      | public | protected | private |
| ---------------- | ------ | --------- | ------- |
| 클래스 내부      | O      | O         | O       |
| 자식 클래스 내부 | O      | O         | X       |
| 클래스 인스턴스  | O      | X         | X       |

## 03. 생성자 파라미터에 접근 제한자 선언

> [코드](./04/AccessModifier2.ts)

* 접근 제한자는 생성자(constructor) 파라미터에도 선언할 수 있다.
* 이때 **접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언되고 생성자 내부에서 별도의 초기화가 없어도 암묵적으로 초기화가 수행된다.**

* 만일 생성자 파라미터에 접근 제한자를 선언하지 않으면 생성자 파라미터는 생성자 내부에서만 유효한 지역 변수가 되어 생성자 외부에서 참조가 불가능하게 된다.

  ```typescript
  class Foo {
    // x는 생성자 내부에서만 유효한 지역 변수이다.
    constructor(x: string) {
      console.log(x);
    }
  }
  
  const foo = new Foo('Hello');
  console.log(foo); // Foo {}
  ```

## 04. readonly 키워드

> [코드](./04/ReadOnly.ts)

* `Typescript`는 `readonly` 키워드를 사용할 수 있다. 
* `readonly`가 선언된 클래스 프로퍼티는 선언 시 또는 생성자 내부에서만 값을 할당할 수 있다. 그 외의 경우에는 값을 할당할 수 없고 **오직 읽기만 가능한 상태가 된다.** 이를 이용하여 상수의 선언에 사용한다.

## 05. static 키워드

* ES6의 static키워드는 정적 메서드를 생성할 떄 사용된다 (인스턴스가 아닌 클래스로부터 호출하는 메소드)
  * 인스턴스로부터 호출되는 것이 아니기 떄문에 **정적 메소드는 this를 사용할 수 없다**
* `Typescript`에서는 static 키워드를 클래스 프로퍼티에도 사용할 수 있다. 
* 정적 메소드와 마찬가지로 정적 클래스 프로퍼티는 **인스턴스가 아닌 클래스 이름으로 호출**하며 클래스의 인스턴스를 생성하지 않아도 호출할 수 있다.

## 06. 추상클래스

* `추상 클래스(abstract class)`는 **하나 이상의 추상 메소드**를 포함하며 **일반 메소드도 포함할 수 있다**
* `추상 메소드`는 내용이 없이 메소드 이름과 타입만 선언된 메소드를 말하며 `abstract` 키워드를 사용한다.
* `추상 클래스`를 정의할 때 역시 `abtract` 키워드를 사용하며, 직접 인스턴스를 생성할 수 없고  **상속만을 위해** 사용된다.
* 추상 클래스를 상속한 클래스는 추상 메소드를 **반드시** 구현해야 한다.
* **모든** 메소드가 추상 메소드인 `인터페이스`와 구분하자.