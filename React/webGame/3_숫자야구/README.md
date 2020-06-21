# 목차

* [import vs require](#import-vs-require)

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

