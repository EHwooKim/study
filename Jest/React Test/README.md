# Testing React

:book: `Jest`, `Enzyme` 으로 React Test 하기

## 기본 설정

### Jest

* `Testing`에 사용되는 주된 라이브러리

* `파일명.test.js` 이름을 가진 파일을 통해 테스트한다.

  ![image](https://user-images.githubusercontent.com/52653793/109789175-685d3200-7c53-11eb-8716-c89495a726bb.png)

* `create-react-app`을 통해 `React` 프로젝트 생성시, `Jest`와 기본적인 `Testing` 설정이 되어있다.

  ```bash
  $ npx create-react-app demo
  $ cd demo
  $ npm run test
  ```

  * `npm run test` 입력 시 `Jest` 가 `watch mode`로 실행되어 코드에 수정이 있을 때 자동으로 테스트가 진행된다.

  ![image](https://user-images.githubusercontent.com/52653793/109788340-8fffca80-7c52-11eb-8819-caf616418ac8.png)

  > 또한 위의 단축키들로 원하는 테스트를 진행할 수 있다.

### Enzyme

* `React Test`에 사용되는 또 다른 라이브러리

* Testing을 위한 `가상 DOM`을 만들어주기 때문에 browser 환경이 아니어도 Test를 할 수 있게 도와준다.

* `CRA`에서 사용하는 `React DOM`과 비교했을 때 `Enzyme` 은 여러 장점들이 있다.

  * jQuery style selector들을 사용해 DOM을 탐색한다.
  * 간단한 DOM event 들을 테스트 해볼 수 있다.

* `Enzyme`은 `Shallow Rendering`을 한다.

  * `1 depth`의 컴포넌트만 `render`한다

    * 부모 요소를 `render`할 때, 자식요소는  `placeholder`를 사용한다
  
  * `Shallow` vs `Mount`
  
    ![image](https://user-images.githubusercontent.com/52653793/109808036-fe9c5280-7c69-11eb-9989-1b3db43dbbd0.png)
  
    > 자식 요소는 placeholder를 사용하는 Shallow.
    >
    > 자식 요소까지 모두 render하는 Mount
  
* `Enzyme`은 `props`와 `state` 접근이 가능하다

#### 설치 및 설정

* 설치

  ```bash
  $ npm install --save-dev enzyme jest-enzyme @wojtekmaj/enzyme-adapter-react-17
  ```
  
  > :lipstick: 아직 `enzyme-adapter-react-16`이 `react-17` 과 호환이 안되기 때문에 임시적으로 `@wojtekmaj/enzyme-adapter-react-17`을 설치하여 사용

* 설정

  ```javascript
  import Enzyme from 'enzyme'
  import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'
  
  Enzyme.configure({ adapter: new EnzymeAdapter() })
  ```

#### 예시

```javascript
// app.test.js
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() })

test('renders learn react link', () => {
  const wrapper = shallow(<App />)
  expect(wrapper).toBeTruthy()
});

```

* `shallow` 는 jsx를 인자로 받아서 shallow wrapper를 반환한다.
* [shallow api](https://enzymejs.github.io/enzyme/docs/api/shallow.html)와 [jest api](https://jestjs.io/docs/en/expect)를 통해 적절한 테스트 코드를 작성해주면 된다.

## Test 종류

* `Unit test`
  * 하나의 기능(보통 하나의 함수) 단위로 테스트한다.
* `Integration test`
  * 여러개의 `Unit`들이 함께 잘 작동하는지 테스트한다.
* `Acceptance / End-to-end(E2E) Test` 
  * 유저가 어떻게 사용하는지를 테스트한다.
* `Jest`와 `Enzyme`의 경우 `Unit test`, `Integration test`에 주로 사용된다.



