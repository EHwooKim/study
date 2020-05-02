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

* 바벨은 코드를 받아 코드를 반환하는데 `파싱`과 `출력`만 담당할뿐, `변환` 작업은 **`플러그인`**이 담당한다.

### 커스텀 플러그인

* [커스텀 플러그인](./my-bable-plugin.js)을 만들 떄는 `visitor`객체를 가진 객체를 반환해줘야한다.

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

>  위에서 직접 만들어본 플러그인은 바벨에서 제공하는 [block-scoping 플러그인](https://babeljs.io/docs/en/babel-plugin-transform-block-scoping)이다.

* 커스텀 플러그인 말고 위의 플러그인으로 바벨을 실행해보자.

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

* 플러그인이 길어지면 실행 명령어 또한 길어지게 된다. `babel.config.js` 파일로 이를 관리할 수 있다.

  ```javascript
  // babel.config.js
  module.exports = {
      presets: [
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



