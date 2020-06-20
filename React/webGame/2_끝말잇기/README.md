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

* 현재 `index.html`에서는 `app.js` 파일 한개만 읽을 수 있다. 그런데 지금까지 만들어진 파일만 해도 `client.jsx`, `WordRealy.jsx` 두개, 이 두개를 하나의 파일로 합쳐줘야하는데 그 역할을 해주는 것이 `웹팩(Webpack)`이다!

  > webpack.config.js에서 해당 설정을 해준다.

* 웹팩 설정 후 `webpack` 명령어 입력 (또는 `npx webpack` 또는 package.json에서 설정 후 명령어 사용)
* babel 오류

![webpack-error](https://user-images.githubusercontent.com/52653793/85141167-51231380-b281-11ea-90ce-e45dad9277cc.png)

> jsx 문법을 이해 못해서 생긴 에러, babel을 통해 해결해준다.

* babel 설치

```bash
$ npm i @babel/core @babel/preset-env @babel/preset-react babel-loader
```

* 또 다른 에러

![webpack-error](https://user-images.githubusercontent.com/52653793/85142096-ca6f3600-b282-11ea-9479-d82cddbde59e.png)

> 에러 해결법에 나온대로 `@babel/pugin-proposal-class-properties` 설치

# React에서 Form 다룰 때 많이 나오는 에러

![react-form-error](https://user-images.githubusercontent.com/52653793/85193628-48742100-b305-11ea-89c5-2ea0727842f5.png)

* input 태그 속성에 `value`를 넣을거면 `onChange`(또는 `defaultValue`)를 같이 넣어라. 라는 에러