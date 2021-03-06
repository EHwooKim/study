# click-counter

## 기본 설정

* react

  ```bash
  $npx create-react-app click-counter
  ```

* testing library

  ```bash
  $ npm install --save-dev enzyme jest-enzyme @wojtekmaj/enzyme-adapter-react-17
  ```

  > :lipstick: `enzyme-adapter-react-16`이 `react-17` 과 호환이 안되기 때문에 임시적으로 `@wojtekmaj/enzyme-adapter-react-17`을 설치하여 사용

* app.test.js

  ```javascript
  import React from 'react'
  import App from './App';
  import Enzyme, { shallow } from 'enzyme'
  import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'
  
  Enzyme.configure({ adapter: new EnzymeAdapter() })
  ```

## 테스트 목록

이번 프로젝트에서 테스트할 내용들

* 에러없이 랜더링이 잘 되는지
* 버튼이 랜더링 되는지
* counter가 화면에 보여지는지
* counter가 0부터 시작하는지
* 버튼을 클릭했을 때 couter가 증가하여 보여지는지

```javascript
// app.test.js
test('renders without error', () => {

})
test('renders button', () => {

})
test('renders couter display', () => {

})
test('counter starts at 0', () => {

})
test('clicking on button increase couter display', () => {
  
})
```

## data-test attributes

최상위 요소 (현재는 div 요소)에 `data-test` attribute를 추가하여 테스트를 진행합니다.

`id`나 `class`를 사용하지 않는 이유는 이미 `id`와 `class`는 역할이 있고, `class`의 경우 언제든지 변경될 수 있기 때문입니다. 또한 개발모드에서 테스트할 때만`data-test`를 사용하기때문에 목적이 확실하고 배포할 떄는 모두 삭제한 상태로 배포할 수 도 있기때문에 `data-test` attribute를 사용합니다.

> 배포시 삭제의 경우 [babel-plugin-react-remove-properties](https://www.npmjs.com/package/babel-plugin-react-remove-properties)를 통해 할 수 있습니다

### Shallow.find

테스트를 위해 `data-set`을 추가했으면 `Enzyme`을 통해 해당 어트리뷰트를 사용할 수 있습니다.

`Enzyme`의 `shallow`는 `.find` 메서드를 통해 원하는 node를 찾을 수 있습니다.

* `.find(selector) => ShallowWrapper` [공식문서](https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/find.html)
  * 인자로 `selector`를 받는데 이는 css selector와 동일합니다. [공식문서](https://enzymejs.github.io/enzyme/docs/api/selector.html)
  * 그중에서 우리는 `[href="foo"]`를 사용할 것입니다.
    * **[`attribute name`=`"value"`]**  ( value에 따옴표 빠지지않게 주의 )
  * `selector`와 일하는 node를 찾아 `ShallowWrapper`를 반환합니다.

## Tests

### renders without **error**

`App.js`와 `App.test.js.`를 수정하여 첫번째 테스트를 진행해보겠습니다

```javascript
// App.js
...
function App() {
  return (
    <div data-test="component-app">
    </div>
  );
}
...
```

> test를 위한 data-test="component-app"

```javascript
// App.test.js
...
test('renders without error', () => {
  const wrapper = shallow(<App/>) 
  const appComponent = wrapper.find("[data-test='component-app']") // 따옴표 주의!!
  expect(appComponent.length).toBe(1)
})
```

>1. shallow는 jsx를 받아서 wrapper 반환합니다.
>
>2. 반환된 wrapper에서 find 메서드를 통해 우리가 원하는 요소를 찾아 반환합니다.
>
>3. appComponent에 반환된 wrapper를 받아 해당 요소의 길이가 1인지 테스트합니다.
>
>   (find 메서드는 해당 selector와 일치하는 모든 요소를 찾는데, 우리는 지금 한개 뿐이니 length가 1일것입니다)
>
>4. 테스트가 무사히 완료된 것을 확인할 수 있습니다.
>
>   (toBe(1)를 toBe(2)로 바꾸면 테스트 실패)

### renders button

### renders couter display

위와 동일한 방법으로 두가지 테스트를 더 진행해보겠습니다.

```javascript
// App.js
function App() {
  return (
    <div data-test="component-app">
      <h1 data-test="counter-display">The counter is currently</h1>
      <button data-test="increment-button">increment counter</button>
    </div>
  );
}
```

```javascript
// App.test.js
test('renders button', () => {
  const wrapper = shallow(<App/>)
  const button = wrapper.find("[data-test='increment-button']")
  expect(button.length).toBe(1)
})
test('renders couter display', () => {
  const wrapper = shallow(<App/>)
  const counterDisplay = wrapper.find("[data-test='counter-display']")
  expect(counterDisplay.length).toBe(1)
})
```

### :wrench:Code refactoring 

현재 `App.test.js`에 중된 코드를 함수화 하여 리팩토링

```javascript
// App.test.js
const setup = () => shallow(<App/>)
const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`)

test('renders without error', () => {
  const wrapper = setup()
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent.length).toBe(1)
})
test('renders button', () => {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'increment-button')
  expect(button.length).toBe(1)
})
test('renders couter display', () => {
  const wrapper = setup()
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.length).toBe(1)
})
```

리팩토링 후에도 중복된 코드가 많습니다. 그렇다고 코드 중복을 줄이기 위해 아래와 같이 테스트 코드를 작성하는 것은 추천하지 않습니다.

```javascript
// App.test.js
const setup = () => shallow(<App/>)
const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`)

test("renders component and elements without error", () => {
  const wrapper = setup()    
  
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent.length).toBe(1)
    
  const button = findByTestAttr(wrapper, 'increment-button')
  expect(button.length).toBe(1)
    
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.length).toBe(1)
})

```

:notebook_with_decorative_cover: ​하나의 `test에`는 하나의 `expect`만 작성하는 것이 좋습니다.

각 `test`의 설명과 통과된 `test`의 개수들은 굉장히 유용한 정보이고, 하나의 `test`에 여러개의 `expect`가 있을 경우 앞선 `expect`에서 에러가 발생하면 뒤쪽 코드가 실행되지 않아 원하는 `test`를 모두 진행해볼 수 없습니다.

또한 앞으로 배우게 될 `before*` 메서드를 효율적으로 사용하기 위해서도 하나의 `test`에는 하나의 `expect`만 있는 것이 좋습니다.

###  counter starts at 0

이제 counter가 정상적으로 작동하는지 테스트해보겠습니다.

우선 counter의 초기값으로 `0`이 화면에 그려지는지 테스트할 것입니다.

이때 우리는 React 코드상에 값을 테스트하는 것이 아닌,  `.text()` 메서드를 통해 `화면에 그려지는 값`을 테스트 할 것입니다.

* `.text() => String` [공식문서](https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/text.html)

```javascript
// App.js
...
  <h1 data-test="counter-display">
    The counter is currently
    <span data-test="count">{count}</span>
  </h1>
...
```

> 테스트를 위해 span 태그에 data-test 값을 추가하고, count를 보여줍니다.

```javascript
test('counter starts at 0', () => {
  const wrapper = setup()
  const count = findByTestAttr(wrapper, "count").text()
  expect(count).toBe(0)
})
```

> findByTestAttr(wrapper, "count")를 통해 원하는 요소를 찾고, .text() 메서드로 해당 요소 안의 text값을 가져와 테스트를 진행합니다.

![image](https://user-images.githubusercontent.com/52653793/110204254-714d3e00-7eb5-11eb-821f-5e01d5fd4398.png)

>  :exclamation:  .text() 메서드는 String을 반환하기 때문에 toBe(0)이 아닌 toBe("0")으로 해야 테스트를 통과합니다.

### increase couter display

이제 아래 과정에 따라 버튼을 클릭했을 떄 counter가 1씩 증가하는지를 테스트해보겠습니다.

1. 버튼을 찾는다
2. 버튼을 클릭한다.
3. 화면에 그려지는 부분을 찾아 증가된 값이 제대로 그려졌는지 확인힌다.

버튼을 찾는 것까지는 지금까지 해왔던 것 처럼 wrapper와 `.find()` 메서드로 충분히 할 수 있습니다.

해당 버튼을 클릭해보는 작업은 `.simulate()`메서드를 통해 할 수 있습니다.

*  `.simulate(event[, ...args]) => Self` [공식문서](https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/simulate.html)
   *  첫번째 인자로 `evnet`를 받는데, 지금 우리는 `'click'`을 넣어주면 됩니다.

```javascript
// App.js
...
  <button 
    data-test="increment-button"
    onClick={() => setCount(count + 1)}
  >
    increment counter
  </button>
...
```

> button에 click 이벤트를 달아주고

```javascript
// App.test.js
test('clicking on button increase couter display', () => {
  const wrapper = setup()
  // find the button
  const button = findByTestAttr(wrapper, 'increment-button')
  // click the button
  button.simulate('click')
  // find the display, and test that the number has been incremented
  const count = findByTestAttr(wrapper, "count").text()
  expect(count).toBe("1")
})
```

> 버튼을 한번 클릭하면 값이 0에서 1이 되길 바라는 테스트 코드입니다.
>
> 위와 마찬가지로 text()메서드는 String을 반환하므로  toBe(1)이 아닌 toBe("1")임에 유의해야합니다.

`npm start`로 리액트를 실행하지 않아도, 우리가 원하는 테스를 진행할 수 있게 되었습니다.

![image](https://user-images.githubusercontent.com/52653793/110204622-60053100-7eb7-11eb-8150-468436050d52.png)