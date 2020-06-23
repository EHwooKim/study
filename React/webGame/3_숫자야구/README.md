# 목차

* [import vs require](#import-vs-require)
* [반복문](#반복문)
* [불변성](#불변성)

# import vs require

* `require` - `Node`의 module system
  * `module.exports` - `require`
* `import` - `ES6`의 module system
  * `export` - `import`
  * `export default` 로 내보낸 모듈은 `import Something` 과 같이 불러온다.
  * 그 외에 `export const Hello`와 같이 내보낸 모듈은 `import { Hello }` 와 같이 불러온다.

* 예시

```javascript
// ES6
import React from 'react'
export const hello = 'hello'
export const bye = 'bye'
export default hi

// Node (commonJS)
const React = reqruire('react')
exports.hello = 'hello'  // module.exports = { hello: 'hello' }
module.exports = hi
```

* 기본적으로 `Node`로 웹팩을 돌리기 때문에 **require를 주로 사용할 것이다.**
* `babel`이 import를 require로 바꿔주기 때문에 import도 사용할 수 있기도 하다.
  * 그래서 `webpack.config.js`같이 Node로 돌아가는 파일은 `import`쓰면 에러가 나고, `client.jsx`같이 `babel`이 적용되는 파일은 `import`를 써도 에러가 안난다.

# 반복문

* JS의 map을 통해 반복문을 만들 수 있으며 `key`값을 반드시 써줘야한다.

* [지난 커밋 참고](https://github.com/EHwooKim/study/commit/90cbb9f0b41005f41292f91a4788623fcd73e93a)


# 불변성

* React에서 state에 있는 배열에 값을 추가할 때 `push`를 쓰면 안된다. (리액트가 감지를 못해..)
* 올바른 방법

```javascript
array = [1] // state에 있는 배열
const array2 = [...array, 2] // 기존배열 분해하여 넣고, 새로운 값 넣기 

// 이렇게 넣으면 array와 array2가 다르기 때문에 변화를 감지하고 render를 할 수 있다.
// (예전 state === 현재 state) 했을 때 false가 나와야 변화를 감지할 수 있다.(참조가 바뀌어야한다.)
```

# 리액트 성능 향상 

* 현재 숫자야구 '시도'부분은 변하지 않는데도 props나 state가 변할 때마다 계속 랜더링된다. 이런게 쌓이다 보면 성능에 문제가 생기게 된다.
* `shouldComponentUpdate`를 통해 랜더링 조건을 설정하여 원하지 않을 때 컴포넌트가 랜더링 되는 것을 막아 성능을 향상시킬 수 있다.