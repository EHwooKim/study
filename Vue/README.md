# Vue(웹게임)

* Vue - data 중심으로 생각해라. 바뀌는 부분이 어디인지 주목하자.

## 01. 구구단

### Math

* Math.ceil(n) : n 이상의 숫자 중에서 가장 작은 수. 소수점 이하를 올림한 정수

  ```javascript
  Math.ceil(1.4) // 2
  Math.ceil(1.6) // 2
  Math.ceil(-1.4) // -1
  Math.ceil(-1.6) // -1
  ```

* Math.floor() : n 이하의 숫자 중에서 가장 큰 수. 소수점 이하를 내림한 정수

  ```javascript
  Math.floor(1.9) // 1
  Math.floor(9.1) // 9
  Math.floor(-1.9) // -2
  Math.floor(-9.1) // -10
  ```

* Math.random() : 0`이상` 1`미만`의 부동소수점 반환

*  1이상 9 이하의 임의의 숫자 뽑기

  ```javascript
  // Math.random() * 9 로 0.x ~ 8.x 의 숫자를 생성하고
  // Math.ceil()로 소수점 이하를 올림하여 1 ~ 9 숫자를 반환.
  Math.ceil(Math.random() * 9)
  ```

### preventDefault

* `preventDefault()` : submit의 기본 기능인 화면 새로고침을 하지않는다.

### ref, focus

* `submit`후에 `input form` 바로 포커싱 되어 답 입력 편하게 하기.

  * 데이터가 아닌 태그에 직접 접근해야한다.

  * `ref`, `focus()` 활용!

    ```html
    <input ref="answer">
    
    <script>
        ...
        this.$refs.answer.focus()
        ...
    </script>
    ```

    > 편리한 방법이라고 남용하지 말자. 특히 ref를 이용하여 값을 변경시킬 경우 데이터 자체가 변하는 것이 아니기 때문에 주의!

## 02. 끝말잇기

### component

* 반복되는 코드는 component로 만든다.
* `data`를 객체형식으로 표현했던 vue 인스턴스와는 다르게 `함수형태`로 만들어야한다.
  * 이는 여러번 사용되는 컴포넌트에서의 참조관계 때문이다.

## 03. 숫자야구

### Webpack

> 많아지는 `script`를 효율적으로 관리하기 위함.

* `package.json`

  * 버전 관리를 위한 파일

  ```bash
  $ npm init
  package name 적고 엔터 엔터... => package.json 파일 생성
  ```

  ```json
  // package.json
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    }, 
  	이 부분을 다음과 같이 수정.
      "build": "webpack"
  그 이후로 $ npm run build 명령어 가능
  ```

  > $ scripts: npm run __script이름__(build) 을 치면 webpack이 실행된다.

* `vue 설치`

  ```bash
  $ npm install vue (= $ npm i vue)
  ```

* `web pack 설치`

  ```bash
  $ npm i webpack webpack-cli -D
  ```

  > -D 옵션: '개발할 때만 사용하겠다.' --save-dev 와 같은 옵션

* `webpacking 설정`

  * `webpack.config.js` 파일 생성 (webpack에 대한 설정을 적는 파일)

    ```javascript
    // webpack.config.js
    const VueLoaderPlugin = require('vue-loader/lib/plugin')
    const path = require('path') // 절대경로 작성을 도와주는 node의 기능
    
    modeul.exports = { // node의 모듈을 만든 것. 이 객체를 웹팩이 웹팩처리를 할 떄 사용하고 웹패					킹이라 부르겠다.
      entry: {
    	app: path.join(__dirname, main.js) // './main.js'으로 적었던 것을 절대경로로
      },
      module: {
          rules: [{
    	      test: /\.vue$/, // 정규표현식. .vue로 끝나는 파일는 아래의 loader를 사용하겠다
              loader: 'vue-loader',          
          }],
      },
      plugins: [
        new VueLoaderPlugin(), // pluin 넣으라는 경고문을 보고 넣었다.
      ],
      output: {
     	filename: 'app.js'  // '[name].js' ,
        path: path.join(__dirname, 'dist'), //'./dist'로 적었던 것을 절대경로로
      },
  }
    ```
  
    * `entry` : 많은 스크립트를 하나로 합치는, 가장 대표가 되는 파일을 적는다.
      * `pp`: 하나로 합쳐질 파일의 이름. main.js 외의 스크립트들이 app.js로 합쳐지고  `output`에 적어 준다.
    * `module`
    * `rules`: 스크립트 **파일들을** 합칠 때 어떻게 합칠 것인지, `webpack`은 js 파일들만 합칠 수 있는데 `.vue` 파일 처럼 js가 아닌 파일들을 어떻게 처리할지 적는다. 
      * `loader`에 있는 것 역시 npm i 필요
  * `plugins`
  
  * `main.js`
  
    ```javascript
    //main.js
    import Vue from 'vue' // ES2015 문법의 모듈시스템으로 package.json에 설치한 vue를 가져온다
  import numberBaseball from './numberBaseball.vue' // main 과 numberBaseball을 연결
    
    new Vue().$mount('#root')  // vue instance를 만들었고 numberBaseball.vue에서 컴포넌트와 같은 것들을 만든다.
    ```

  * 각종 오류들
  
    * 절대경로 설정해라. => `path` 활용 해결
  
    * webpack은 html 파일 못읽는다.  => `vue-loader` 
  
    * vue-loader plugin에 추가해라. => `plugins`에 추가
  
    * vue-template-compiler 설치해라. => 설치. :lipstick:`vue`와 `vue-template-compiler`는 버전이 일치해야한다.
  
      * 특정 버전 설치 
      
      ```bash
      npm i vue@2.7.0 같이 버전을 함께 적어준다. (@없이는 항상 최신버전 설치)
      ```
  
  
  * 정상적으로 작동하면 `dist`안에 `app.js`가 생성될 것이다.

### 숫자야구

* `methods`에서 `event.preventDefault ` => `@submit.prevent` 로 단축가능.
* 변수와 데이터 각각 언제 써야할지 모르겠다
  * 화면에 보여지는 것이 `데이터`
  * 계산식에 쓰이는 것들은 `변수`

## 04. 반응속도체크

* 비동기코드와 vue

### 자동 npm run build 

```json
// package.json
...
"build": "webpack --watch"  // 추가
...
```

### style-loader

* `responseCheck.vue`의 `style`를 변경 시켜보니

  * You may need an additional loader to handle the result of these loaders. 오류 발생

  ```bash
  $ npm i vue-style-loader -D
  $ npm i css-loader -D
  ```

  ```javascript
  //webpack.config.js => rules에 다음 추가
  {
    test: /\.css$/,
    loader: [
      'vue-style-loader',
      'css-loader',
    ]
  }
  ```

### scoped

* vue에서 재사용의 단위는 컴포넌트 기준인데 css는 다른 파일에도 적용이 되기 때문에 style에 `scoped`를 적어주면 해당 컴포넌트 내에서만 적용된다.

### webpack-dev-sever

* 자동으로 npm run build 가 되지만 브라우저에서는 새로고침해야 적용된다. 그 새로고침마저도 자동으로 되도록 하는 설정

```bash
$npm i -D webpack-dev-server
```

```json
// package.json
"scripts": {
  "build": "webpack --watch",
  "dev": "webpack-dev-server --hot"   //<= 추가
},
```

```javascript
// webpack.config.js
output: {
    publicPath: '/dist' //추가
}
```

* npm run dev 하면 새로고침 없이도 변경사항 적용.

### reduce

### computed

* `computed`를 사용하면 해당 값이 캐싱되어 성능향상에 도움이 된다.

* 데이터를 계산하여 보여주는 부분이 있다면 {{}}안에서 계산 하는 것 보다 `computed`를 사용하자
* `computed`를 사용하지 않는다면, result가 아닌 message만 바뀌어도 화면이 다시 그려지면서  {{}}안의 계산식 또한 다시 실행되게 된다.

### v-show, v-if

* `v-show`는 태그가 존재하지만 `display:none`으로 안보이게 처리.
* `v-if`는 태그조차 없는 상태
* 보통은 `v-if`를 사용하여 `v-else`와 같은 기능도 함께 사용한다.

### template

* `div`를 단순히 어떤 태그들을 감싸는 용도로만 사용한다면 `div`대신 `template`을 써보자.
* 그렇게 하면 `div`로 감쌌을 때와는 다르게 `template`바깥의 태그들와 형제태그가 된다.