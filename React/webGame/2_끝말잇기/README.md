# React cli 없이 리액트 설치하기

* 리액트 설치

```bash
$ npm init

$ npm i react react-dom
```

* 웹팩 설치

```bash
$ npm i -D webpack webpack-cli
```

> 웹팩은 개발할 때만 필요하기 때문에 `-D` 옵션 추가

* `webpack.config.js` 파일 생성

```js
module.exports = {
    
}
```

* `client.jsx` 파일 생성

```jsx
const React = require('react')
const ReactDom = require('react-dom')
```

> 이제 리액트를 script로 불러오는게 아닌 Node의 모듈 시스템을 통해 npm설치한 것을 불러올 수 있다.