​	

# 바벨 (Babel)

* 브라우저마다 사용하는 언어가 달라 프론트엔드 코드가 일관적이지 못한데, `바벨`은 `ES6+` 로 작성된 코드를 모든 브라우저에서 일관되게 작동하도록 호환성을 지켜준다.

## 설치

```bash
$npm i @babel/core @babel/cli
```

## 실행

>  설치가 끝나면 `node_modules/.bin/babel`이 생성되어 이를 통해 실행 시킬 수도 있다

```bash
$npx babel app.js // app.js - 변환시킬 코드가 담긴 파일
```

> 위와 같이 npx를 사용하여 실행

* 바벨은 세 단계로 빌드를 진행한다.
  1. `파싱(Parsing)` - 코드를 받아 토큰별로 분해한다.
  2. `변환(Transforming)` - `ES6+` 로 작성된 코드를 `ES5`로 변환한다.
  3. `출력(Printing)`

## 플러그인

* 바벨은 코드를 받아 코드를 반환하는데 `파싱`과 `출력`만 담당할뿐, `변환` 작업은 **플러그인**이 담당한다.

### 커스텀 플러그인

* [커스텀 플러그인](./my-babel-plugin.js)을 만들 떄는 `visitor`객체를 가진 객체를 반환해줘야한다.

* 커스텀 플러그인 실행

  ```bash
  $npx babel --help
  ```

  ![SmartSelectImage_2020-05-03-00-19-42](https://user-images.githubusercontent.com/52653793/80869298-aa87b100-8cda-11ea-8863-f9a927026bfa.png)

  ```bash
  $npx babel app.js --plugins './my-babel-plugin.js'
  ```
  
  ![SmartSelectImage_2020-05-03-00-22-11](https://user-images.githubusercontent.com/52653793/80869358-fa667800-8cda-11ea-8638-4e1a8c2d4d05.png)



### 플러그인 사용하기

> 위에서 직접 만들어본 플러그인은 바벨에서 제공하는 [block-scoping 플러그인](https://babeljs.io/docs/en/babel-plugin-transform-block-scoping)과 동일하다.
>
> 커스텀 플러그인 말고 위의 플러그인으로 바벨을 실행해보자.

* 패키지 설치

  ```bash
  $npm install --save-dev @babel/plugin-transform-block-scoping
  ```

* 실행

  ```bash
  $ npx babel app.js --plugins @babel/plugin-transform-block-scoping
  ```

* 결과

  ![SmartSelectImage_2020-05-03-00-41-07](https://user-images.githubusercontent.com/52653793/80869384-1d912780-8cdb-11ea-8f42-34a58fe41247.png)

* 추가적인 플러그인도 실행해보자

  * [화살표 함수 변환](https://babeljs.io/docs/en/babel-plugin-transform-arrow-functions)

    ```bash
    $npm install --save-dev @babel/plugin-transform-arrow-functions
    ```

  * [strict mode](https://babeljs.io/docs/en/babel-plugin-transform-strict-mode)

    ```bash
    $npm install --save-dev @babel/plugin-transform-strict-mode
    ```

  * 결과

  ![SmartSelectImage_2020-05-03-00-47-27](https://user-images.githubusercontent.com/52653793/80869423-487b7b80-8cdb-11ea-8c0d-3914f200c487.png)

* 사용하는 플러그인이 많아지면 실행 명령어가 길어지게 된다. `babel.config.js` 파일로 이를 관리할 수 있다.

  ```javascript
  // babel.config.js
  module.exports = {
      plugins: [
          "@babel/plugin-transform-arrow-functions",
          "@babel/plugin-transform-block-scoping",
          "@babel/plugin-transform-strict-mode",  
      ]
  }
  ```

* 이제 `npx babel app.js`만 실행하여도 config 파일을 읽어 플러그인을 실행시킬 수 있다.

## 프리셋

> 필요한 플러그인을 하나씩 찾아서 설치, 추가하지 않아도 되도록 목적에 맞게 여러 플러그인을 세트로 모아놓은 것을 `프리셋`이라고 한다.

### 커스텀 프리셋

```javascript
// my-babel-preset.js
module.exports = function myBabelPreset() {
    return {
        plugins: [
            "@babel/plugin-transform-arrow-functions",
            "@babel/plugin-transform-block-scoping",
            "@babel/plugin-transform-strict-mode",            
        ]
    }
}
```

```javascript
// babel.config.js
module.exports = {
    presets: [
        './my-babel-preset.js'
    ]
}
```

### 프리셋 사용하기

> 바벨은 목적에 따라 몇가지 프리셋을 제공한다.

* `preset-env`, `preset-react`, `preset-typescript` 등...

#### preset-env

* `ES6+`를 변환할 떄 사용한다. (연도별로 나뉘어져 있던 것이 지금은 env하나로 합쳐졌다.)
* 익스플로러 호환을 위해 이를 한번 사용해보자

```bash
$npm i @babel/preset-env
```

```javascript
// babel.config.js
module.exports = {
    presets: [
        '@babel/preset-env'
    ]
}
```

```bash
$npx babel app.js
```

* 일반적으로 실무에서는 직접 플러그인과 프리셋을 만들어 쓰기보다 위와 같이 만들어진 `preset`을 다운받아 쓰고, `env` 프리셋을 가장많이 사용한다.

#### 타겟 브라우저

* 해당 프리셋이 특정 브라우저를 지원도록 지정해줄 수 있다.

  ```javascript
  // babel.config.js
  module.exports = {
      presets: [
          ['@babel/preset-env',{
              targets: {
                  chrome: '79' // 크롬 79까지 지원하는 코드를 만든다.
              }
          }]
      ]
  }
  ```

* 현재 예제 코드는 chrome에서 정상작동 하는 코드이기 떄문에 변화가 없다.

  ![SmartSelectImage_2020-05-03-01-33-17](https://user-images.githubusercontent.com/52653793/80869929-20414c00-8cde-11ea-9c0a-71fe0143b98c.png)

* `const`와 `arrow func`이 IE에서 작동하지 않기 때문에 `targets`에 `IE: '11'`을 추가하면 아래와 같이 코드가 변하는 것을 확인할 수 있다.

  ![SmartSelectImage_2020-05-03-01-35-20](https://user-images.githubusercontent.com/52653793/80869969-5e3e7000-8cde-11ea-8c2d-fe58b24f038d.png)

#### 폴리필

`Promise`는 크롬에서는 지원하지만 IE에서는 지원하지 않는다.

`app.js`에 Promise객체 생성 후 바벨을 실행시켜보자.

![babel_promise](https://user-images.githubusercontent.com/52653793/95649556-e3914080-0b18-11eb-8e93-d621cd68179e.png)

`Promise`가 ECMAScript5 버전으로 변환되는 것을 기대했지만, 변하지않고 그대로인 것을 확인할 수 있다.

`Babel`은 ES6 문법 중 **ECMAScript5 버전으로 변환할 수 있는 것만** 빌드한다.

**그렇지 못한 것들은 `폴리필`이라고 부르는 코드조각을 추가해서 해결한다.**

이러한 폴리필을 제공하는 대표적인 라이브러리로는 `core-js`, `@babel/polyfil` 등이 있다.

`@preset-env`는 타겟 브라우저뿐 아니라 폴리필을 지정할 수 있는 옵션을 제공한다.

```javascript
// babel.config.js
module.exports = {
    presets: [
        ['@babel/preset-env',{
            targets: {
                chrome: '79',
                ie: '11'
            },

            // 폴리필 사용 옵션
            useBuiltIns: 'usage', // 'entry', false 옵션도 가능
            corejs: {
                version: 2,
            }
        }]
    ]
}
```

![polyfil](https://user-images.githubusercontent.com/52653793/95649763-1f78d580-0b1a-11eb-9cbf-0b7886c5898f.png)

실행 결과, Promise부분은 그대로지만 상단에 `require` 함수가 동작하고 있는 것을 확인할 수 있다.

(core-js 라이브러리에서 promise 폴리필 파일을 가져오는 코드)

## 웹팩으로 통합 (babel-loader)

바벨은 **웹팩으로 통합해서** 사용하는 것이 일반적이다. 로더형태로 제공하는데 `babel-loader`가 그것이다.

* 설치 및 설정

  ```bash
  $ npm i -D babel-loader
  ```

  ```javascript
  // webpack.config.js
  modiles: {
    rules: [
      ...
      // 바벨 설정
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // node_modules 코드들은 바벨 로더가 처리하지 않도록
        exclude: /node_modules/
      }
    ]
  }
  ```

  > entry 경로도 제대로 설정하고 빌드를 해보자.

![babelError](https://user-images.githubusercontent.com/52653793/95650416-86988900-0b1e-11eb-9e8f-0c8d0824658d.png)

빌드를 해보면 위와 같은 에러가 발생한다.

core-js ~~라는 모듈을 찾을 수 없다는 에러인데, 우리가 빌드를 했을 때 app.js가 바벨에 의해 변환될 것이고, 변환 결과에 코드 상단에 core-js (즉, **폴리필**)가 로드(require)되는 코드가 추가될 것이다. 

그리고 웹팩은 그 코드를 보고 `core-j`s를 어디에선가 찾을텐데, node_modules 폴더 안에 `core-js`가 없기 때문에 발생하는 오류이다. 

그러니까.. core-js 설치하자~

```bash
$ npm i core-js@2 
```

> babel 설정에서 core-js 2버전을 사용한다 명시했으니 @2를 붙여 2버전을 설치한다.

이제 다시 빌드해보면 정삭적으로 빌드가 되는 것을 확인할 수 있다.