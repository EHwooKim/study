# Jest

## 설치 및 기본 사용법

* 설치

  ```bash
  $npm install --save-dev jest
  ```

  > 또는 yarn add -dev jest

* 사용

  * `sum` 함수 정의

  ```javascript
  // sum.js
  function sum(a, b) {
      return a + b
  }
  module.exports = sum
  ```

  * test 코드 작성
    * `파일명.test.js` 파일을 생성
    * test(`테스트 명`, `테스트 코드`)  

  ```javascript
  // sum.test.js
  const sum = require('./sum')
  test('add 1 + 2 to equel 3', () => {
      expect(sum(1, 2)).toBe(3)
  })
  ```

  ```javascript
  // package.json
  {
      "scripts": {
          "test": "jest"
      }
  }
  ```

  ```bash
  $npm run test
  ```

  ![image](https://user-images.githubusercontent.com/52653793/108985077-f83f3100-76d3-11eb-9875-0edbd7e2ffb1.png)









































## Matchers

* 테스트 코드 작성시 사용되는 `expect`함수는 `expectation 객체`를 반환하는데 `Macher`라 불리는 메서드와 함께 테스트 코드를 작성한다.

  ```javascript
  test('expectation', () => {
      const ex = expect(sum(1, 2)) // ex - expectation 객체
      ex.toBe(3) // toBe - Mather
  })
  ```

* Matchers - [공식문서](https://jestjs.io/docs/en/expect)

  | name                                  | usage                                  |
  | ------------------------------------- | -------------------------------------- |
  | [.toBe(value)](###toBe)               | 원시타입 값을 확인                     |
  | [.toEqual()](###toEqual)              | 객체타입 값을 확인                     |
  | [.toStrictEqual](###toStrictEqual)    | 객체타입 값을 확인 (보다 정확하게)     |
  | [.toThrow(error?)](###toThrow)        | 함수의 에러 발생을 확인                |
  | [Truthiness](###Truthiness)           | 다양한 Truthy들을 확인                 |
  | [Numbers](###Numbers)                 | 수의 대소 비교                         |
  | [.toBeCloseTo(value)](###toBeCloseTo) | 소수값 확인                            |
  | [.toMatch(reg)](###toMatch)           | 정규표현식으로 문자열 확인             |
  | [.toContain](###toContain)            | 배열과 같은 iterable 속 포함 여부 확인 |

### toBe

* 원시 타입 값을 확인할 때 사용. (값을 비교할 때 `Object.is`를 통해 비교한다)

```javascript
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```

### toEqual

* 객체 타입 값을 확인할 때 사용.

```javascript
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```

### toStrictEqual

* 객체 타입 값을 확인할 때 사용.

* `toEqual`와의 차이점

  * 객체와 배열에서 `undefined` 값을 체크한다.

    ```javascript
    const obj = {a: undefined, b: 2}
    
    test('toEqual', () => {
      expect(obj).toEqual({b: 2}) // pass
    })
    test('toStrictEqual', () => {
      expect(obj).toStrictEqual({b: 2}) // fail
    })
    
    const arr = [undefined, 2]
    test('toEqual', () => {
      expect(obj).toEqual([, 2]) // pass
    })
    test('toStrictEqual', () => {
      expect(obj).toStrictEqual([, 2]) // fail
    })
    ```

  * 객체의 `타입` 또한 체크하여 같은 키와 값을 가지더라도, 어떤 클래스의 인스턴스와 literal object를 다른 값으로 인식한다.

    ```javascript
    class Person {
      constructor(name) {
        this.name = name
      }
    }
    
    test('toEqual', () => {
      expect(new Person('kim')).toEqual({name: 'kim'}) // pass
    })
    test('toStrictEqual', () => {
      expect(new Person('kim')).toStrictEqual({name: 'kim'}) // fail
    })
    ```


### Truthiness

* Javascript에서는 `undefined`, `null`, `false` 등이 `Falsy`값인데 이를 구분하여 확인할 수 있다.

  * `toBeNull` - null만 확인
  * `toBeUndefined` - undefined만 확인
  * `toBeDefined` - toBeUndefined의 반대
  * `toBeTruthy` - Truthy 확인
  * `toBeFalsy` - Falsy 확인

  ```javascript
  test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });
  ```

### Numbers

* 수의 대소 비교를 확인한다.

  ```javascript
  test('two plus two', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);
  });
  ```

### toBeCloseTo

* 소수값을 확인한다.

  ```javascript
  test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    expect(value).toBe(0.3);        // fail
    expect(value).toBeCloseTo(0.3); // pass
  });
  ```

### toMatch

* 정규표현식과 함께 문자열을 확인한다.

  ```javascript
  test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
  });
  ```

* 단순히 같은 값인지를 비교할 떄는 원시값 비교인 `toBe`를 사용하면 된다.

### toContain

* 배열과 같은 iterable한 값에 특정 값의 포함 여부 확인한다.

  ```javascript
  const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'milk',
  ];
  
  test('the shopping list has milk on it', () => {
    expect(shoppingList).toContain('milk');
    expect(new Set(shoppingList)).toContain('milk'); // 배열말고도 iterable 한 값이면 가능
  });
  ```

### toThrow

* 함수에서 에러가 발생하는지 확인한다.
* `expect`의 인자로 함수를 바로 넘기는 것이 아닌 함수로 한번 감싸줘야 한다.
* 인자로 에러 메시지, 정규표현식 등을 넘겨주면 에러메시지에 해당 값과 같은지, 포함되어있는지도 확인한다.

```javascript
function drinkFlavor(flavor) {
  if (flavor == 'octopus') {
    throw new DisgustingFlavorError('yuck, octopus flavor');
  }
}
test('throws on octopus', () => {
  expect(() => { // 함수로 한번 더 감싸줘야 에러를 제대로 탐지한다.
    drinkFlavor('octopus');
  }).toThrow();
});
```



