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



## 비동기 테스트

* 자바스크립트 특성상 비동기 코드를 다루는 일이 많아 이를 테스트하는 방법을 알아보자

### Callback

* 함수 `fetchData(callback)`가 비동기적으로 어떤 data를 받아와서 `callback(data)`를 실행시키는 함수라 했을 때, 반환되는 값이 `'peanut butter'`인지 `test`해보는 코드를 작성해보자

  ```javascript
  test('the data is peanut butter', () => {
    function callback(data) {
      expect(data).toBe('peanut butter');
    }
  
    fetchData(callback);
  });
  ```

  * 이 코드를 작동시켜보면 테스트를 통과한 것 처럼 결과가 나온다.
  * 하지만 실제로는 비동기 코드를 기다리지 않고 테스트를 진행하여 우리가 원하는대로 동작한 것이 아니다.

* 비동기 코드를 기다리기 위해서는 `test`함수의 두번째인자에 해당하는 테스트 코드에 `done`이라는 인자를 받아 이를 활용하면 된다.

  ```javascript
  test('the data is peanut butter', done => {
    function callback(data) {
      try {
        expect(data).toBe('peanut butter');
        done();
      } catch (error) {
        done(error);
      }
    }
  
    fetchData(callback);
  });
  ```

  * 이렇게 `done`을 받아 원하는 위치에 실행을 해주면, `Jest`는 `done` 함수가 실행될 떄까지 테스트를 기다리게 된다.

### Promise

* `Promise`를 사용하면 보다 쉽게 비동기 코드를 테스트할 수 있다.

* 테스트 코드에서 `Promise`를 반환해주면 `Jest`는 `Promise`가 `resolve`될 떄까지 기다려준다.

  ```javascript
  test('the data is peanut butter', () => {
    return fetchData().then(data => {
      expect(data).toBe('peanut butter');
    });
  });
  ```

  * `promise`를 `return`해줘야 하는 것을 잊지말자. 
  * `return`이 없으면 위 코드가 의도대로 작동하지 않는다.
  * 만약 해당 `promise`가 `reject`된다면 테스트는 실패하게 된다.

* `promise`가 `reject`되는지를 테스트하기 위해서는 `then`이 아닌 `catch`를 사용하면된다

  ```javascript
  test('the fetch fails with an error', () => {
    expect.assertions(1);
    return fetchData().catch(e => expect(e).toMatch('error'));
  });
  ```

### resolves / rejects

* 위 방법과 비슷하지만 `Jest`의 `matcher`들 중 `resolves`, `rejects`를 사용할 수도 있다.

  * `resolves`

    ```javascript
    test('the data is peanut butter', () => {
      return expect(fetchData()).resolves.toBe('peanut butter');
    });
    ```

  * `rejects`

    ```javascript
    test('the fetch fails with an error', () => {
      return expect(fetchData()).rejects.toMatch('error');
    });
    ```

* promise떄와 마찬가지로 `return`으로 반환을 해줘야 의도대로 작동하는 것에 유의하자.

### Async / Await

* `async`, `await`를 사용하면 보다 간편하게 테스트 코드를 작성할 수 있다.

* 일반적인 비동기 함수를 사용하는 것과 큰 차이가 없기 때문에 가독성 또한 좋다

  ```javascript
  test('the data is peanut butter', async () => {
    const data = await fetchData();
    expect(data).toBe('peanut butter');
  });
  
  test('the fetch fails with an error', async () => {
    expect.assertions(1);
    try {
      await fetchData();
    } catch (e) {
      expect(e).toMatch('error');
    }
  });
  ```

* `Async / Await`와 위에서 알아본 `resolves / rejects` `matchers`를 함께 사용할 수도 있다.

  ```javascript
  test('the data is peanut butter', async () => {
    await expect(fetchData()).resolves.toBe('peanut butter');
  });
  
  test('the fetch fails with an error', async () => {
    await expect(fetchData()).rejects.toThrow('error');
  });
  ```

  

## Setup and Teardown

`test`를 진행할 때 각 `test`가 시작할 때나 끝날 때마다 특정 작업을 실행시키는 방법에 대해 알아보자

### beforeEach, afterEach

* `beforeEach` - 각 `test` 코드가 시작하기 전에 실행

* `afterEach` - 각 `test` 코드가 종료된 후 실행

* 각 `test` 시작 전 실행시킬 함수 `initializeCityDatabase`, 종료 후 실행시킬 `clearCityDatabase`가 있다면 아래와 같이 사용하면 된다.

  ```javascript
  beforeEach(() => {
    initializeCityDatabase();
  });
  
  afterEach(() => {
    clearCityDatabase();
  });
  
  test('city database has Vienna', () => {
    expect(isCity('Vienna')).toBeTruthy();
  });
  
  test('city database has San Juan', () => {
    expect(isCity('San Juan')).toBeTruthy();
  });
  ```

* 만약 `beforeEach`와 `afterEacg`가 비동기 함수를 다룬다면, **비동기 함수 테스트** 떄와 마찬가지로 `done`인자를 받아 코드 마지막에 실행시키거나, `Promise`를 반환하면 된다.

  ```javascript
  beforeEach(() => {
    return initializeCityDatabase();
  });
  ```

* `beforeEach`, `afterEach`는 같은 test 파일에 작성된 test 코드에서만 작동한다. (다른파일 영향 X)

### beforeAll, afterAll

* `beforeEach`, `faterEach`는 모든 `test`코드가 실행될 때마다 작동하지만, `beforeAll`, `afterAll`은 모든 `test` 코드가 실행되고, 끝날 때 한번씩만 실행된다.

* `test`  코드가 실행되기 전 데이터를 비동기로 받아오는 함수가 있고 이를 모든 `test`코드가 시작하고, 끝날 떄 한번씩만 실행하고 싶다면 아래와 같이 사용하면 된다.

  ```javascript
  beforeAll(() => {
    return initializeCityDatabase();
  });
  
  afterAll(() => {
    return clearCityDatabase();
  });
  
  test('city database has Vienna', () => {
    expect(isCity('Vienna')).toBeTruthy();
  });
  
  test('city database has San Juan', () => {
    expect(isCity('San Juan')).toBeTruthy();
  });
  ```

* `beforeEach`, `afterEach`와 마찬가지로 같은 파일에 작성된 `test` 코드에 대해서만 한번씩 작동한다.(다른파일 영향 X)

### Scoping

* `before*`, `after*` 블럭은 파일내의 모든 `test` 코드에 대해 작동한다.
* 하지만, `describe` 블럭을 사용하면 특정 `test`코드를 그룹화하며 `before*`, `after*`를 해당 그룹 내에서만 작동하도록 만들 수 있다.

```javascript
// 아래 beforeEach 블럭은 이 파일에 있는 모든 test코드가 작동하기 전에 실행된다.
beforeEach(() => {	// ----------------------- (1)
  return initializeCityDatabase();
});

test('city database has Vienna', () => {	// ----------------------- (1-1)
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {	// ----------------------- (1-2)
  expect(isCity('San Juan')).toBeTruthy();
});

describe('matching cities to foods', () => {
  // 아래 beforeEach 블럭은 현재 describe 블럭 내부의 test코드가 작동하기 전에만 실행된다.
  beforeEach(() => {	// ----------------------- (2)
    return initializeFoodDatabase();
  });

  test('Vienna <3 sausage', () => {	// ----------------------- (2-1)
    expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
  });

  test('San Juan <3 plantains', () => {	// ----------------------- (2-2)
    expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
  });
});
```

* `describe` 블럭 내부에서는 해당 블럭 안에 작성된 `before*`, `after*`**만** 실행되는 것이 아닌 `describe`블럭 외부(전역..?)에 있는 `before*`, `after*` 코드 또한 실행된다.

  * 즉, 위 코드에서 `(2-1)`, `(2-2)`코드가 각각 실행되기 전에 `describe`블럭 내부의 `(2)`코드**만** 실행되는 것이 아닌 `(1)`, `(2)` 코드가 모두 실행된다.

  ```javascript
  beforeAll(() => console.log('1 - beforeAll'));
  afterAll(() => console.log('1 - afterAll'));
  beforeEach(() => console.log('1 - beforeEach'));
  afterEach(() => console.log('1 - afterEach'));
  test('', () => console.log('1 - test'));
  describe('Scoped / Nested block', () => {
    beforeAll(() => console.log('2 - beforeAll'));
    afterAll(() => console.log('2 - afterAll'));
    beforeEach(() => console.log('2 - beforeEach'));
    afterEach(() => console.log('2 - afterEach'));
    test('', () => console.log('2 - test'));
  });
  
  // 1 - beforeAll
  // 1 - beforeEach
  // 1 - test
  // 1 - afterEach
  // 2 - beforeAll
  // 1 - beforeEach
  // 2 - beforeEach
  // 2 - test
  // 2 - afterEach
  // 1 - afterEach
  // 2 - afterAll
  // 1 - afterAll
  ```

### 실행 순서

* `Jest`는 `describe` 블럭 내의 `test`코드를 제외한 모든 코드를 실행 시킨 후에 `test`코드는 **마지막에 한꺼번에 처리한다.** (`test` 코드만 비동기처럼 실행되는 느낌)

* 위와 같은 이유때문에서라도 `before*`, `after*` 블럭이 필요한 것이다.

* 아래 코드에서 `console.log` 결과를 예측해보자.

  ```javascript
  describe('outer', () => {
    console.log('describe outer-a');
  
    describe('describe inner 1', () => {
      console.log('describe inner 1');
      test('test 1', () => {
        console.log('test for describe inner 1');
        expect(true).toEqual(true);
      });
    });
  
    console.log('describe outer-b');
  
    test('test 1', () => {
      console.log('test for describe outer');
      expect(true).toEqual(true);
    });
  
    describe('describe inner 2', () => {
      console.log('describe inner 2');
      test('test for describe inner 2', () => {
        console.log('test for describe inner 2');
        expect(false).toEqual(false);
      });
    });
  
    console.log('describe outer-c');
  });
  
  console.log('out of describe block')
  ```

  ```javascript
  // 결과
  // describe outer-a
  // describe inner 1
  // describe outer-b
  // describe inner 2
  // describe outer-c
  // out of describe block
  // test for describe inner 1
  // test for describe outer
  // test for describe inner 2
  ```

  * 다른 코드가 먼저 실행되고 `test` 코드는 마지막에 **한꺼번에 몰아서 실행**되는 것을 확인할 수 있다.

### test.only

* 테스트가 실패했을 떄 `test.only`를 통해 특정 `test`코드만 실행시키는 방법으로 문제점을 찾을 수도 있다.

* `test.only`를 통해 해당 `test`코드만 실행시키는 것이기 떄문에 `before*`, `after*` 또한 그때만 실행된다.

  ```javascript
  beforeEach(() => {
    console.log('init')
  });
  
  afterEach(() => {
    console.log('clear')
  });
  
  test.only('test only', () => {
    expect(1).toBe(1)
  });
  
  test('test', () => {
    expect(2).toBe(2)
  });
  ```

  ![image](https://user-images.githubusercontent.com/52653793/109378490-59564700-7916-11eb-86e3-f1d3b85a3c48.png)

  > test.only 외에는 모두 skip된다.



