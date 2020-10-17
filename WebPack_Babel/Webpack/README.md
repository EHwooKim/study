# **웹팩** (Webpack)

## 1. 배경

* 모듈 시스템 [app.js](./01(배경, 모듈)/src/app.js), [math.js](./01(배경, 모듈)/src/math.js)

  * 전역 스코프에 등록하는 방식 

    -> 모듈 객체를 만들어 해당 객체에 등록하여 전역에서는 접근 못하게 하는 방식 

    -> ES2015 모듈 방식
  
* 그런데 이런 모듈 시스템을 모든 브라우저에서 지원하지 않는다. 그래서 나온 것이 웹팩


## 2. 설치

```bash
$npm i -D webpack webpack-cli
```

* 설치 하면 `node_modules/.bin `에 설치된 것을 확인할 수 있다.

## 3. 실행

* 도움말 `확인`

  ```bash
  $node_modules/.bin/webpack --help 
  ```

* 웹팩 사용을 위한 필수 옵션들

  * `--mode` - 개발, 운영 환경에 따라 설정

    ```bash
    --mode	Enable production optimizations or development hints.
    				[선택: "development", "production", "none"]
    ```

  * `--entry` - 모듈의 **시작** 부분

    ```bash
    --entry	The entry point(s) of the compilation.[문자열]
    ```

  * `--output` - 웹팩을 통해 합쳐진 모듈을 저장할 경로

    ```bash
    --output, -o The output path and file for compilation assets
    ```

* 실행
  
  ```bash
  $node_modules/.bin/webpack --mode development --entry ./src/app.js --output dist/main.js
  ```

![webpack](https://user-images.githubusercontent.com/52653793/95010800-35445180-0667-11eb-919b-044a66100c67.png)

* 실행 후 `dist 폴더`와 **웹팩을 통해 하나의 파일로 합쳐진** `main.js 파일`이 생긴 것을 확인할 수 있다. 그리고 index.html을 수정 후 실행해보면 정상 작동하는 것을 확인할 수 있다.



* 매번 긴 명령어를 사용할 수 없으니 웹팩 설정 파일을 통해 웹팩을 사용해보자.

  * `--config` - 웹팩 설정 파일을 지정할 수 있다. [webpack.config.js](./02(웹팩)/webpack.config.js)

    ```bash
    --config Path to the config file
    		[문자열] [기본: webpack.config.js or webpackfile.js]  
    ```

  *  설정 파일을 작성 후 npm의 script를 이용해 실행해보자.

    ```javascript
    // package.js
    ...
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
    	"build": "webpack"
    },
    ...
    ```

    * npm script를 등록할 때 node_modules 명령어를 모두 쓸 필요없이 `webpack`만 적어도 된다.

    * 실행

      ```bash
      $npm run build
      ```


## 4. 로더

웹팩은 자바스크립트 모듈 뿐만아니라 스타일시트, 이미지, 폰트 등 모두 모듈로 바라보기 때문에 import 구문을 사용하면 자바스크립트 코드 안으로 가져올 수 있다.

그리고 이런 것이 가능한 이유는 웹팩의 `로더` 덕분이다. 로더는 타입스크립트같은 다른 언어를 자바스크립트 문법으로 변환해 주거나 이미지를 data URL 형식의 문자열로 변환하고 CSS 파일을 자바스크립트에서 직접 로딩할 수 있도록 해준다.

<hr/>

* 사용

  * `로더`는 **함수**로 작동한다.

    ```javascript
    // my-webpack-loader.js
    module.exports = function myWebpackLoader (content) {
      console.log('my-webpack-loader가 작동중')
      return content
    }
    ```

  * webpack.config.js에서 `module` 객체에 `rules` 배열에 정의하여 사용할 수 있다.

    ```javascript
    // webpack.config.js
    ...
      module: {
        rules: [
          {
            test: /\.js$/, // '로더가 처리할 파일의 패턴'
            use: [
        	     path.resolve('./my-webpack-loader') // '해당 파일에 적용할 로더'   
            ]
          }
        ]
      }
  ...
    ```

  * 실행 결과

    ![loader](https://user-images.githubusercontent.com/52653793/95039205-15ff0000-070b-11eb-9a58-32f48ca49218.png)

  * `console.log`를 `alert`로 바꿔주는 로더를 만들어보자.
  
    ```javascript
    module.exports = function myWebpackLoader (content) {
      return content.replace('console.log(', 'alert(')
    }
    ```


### css-loader

CSS 파일을 `import`하여 build를 해보면 에러가 발생한다.

![cssLoader](https://user-images.githubusercontent.com/52653793/95039568-19df5200-070c-11eb-98a5-09b2559fd70d.png)

CSS 파일을 자바스크립트에서 불러와 사용하려면 CSS를 **모듈로 변환하는 작업**이 필요하고`css-loader`가 그런 역할을 해준다.

* 설치 및 설정

  ```bash
  $npm i css-loader
  ```

  ```javascript
  // webpack.config.js
  ...
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
              'css-loader'
          ]
        }
      ]
    }
  ...
  ```

* 빌드를 해보면 아래와 같은 결과가 나온다.

  ![afterLoader](https://user-images.githubusercontent.com/52653793/95040275-1f3d9c00-070e-11eb-8e51-c42b94d1e36f.png)

* 하지만 `index.html`파일을 열어보면 아직 css가 적용이 안된 것을 확인할 수 있는데, CSS 코드는 [CSSOM](https://developer.mozilla.org/ko/docs/Web/API/CSS_Object_Model)의 형태로 바뀌어야 브라우저에 적용된다. 그러기 위해 HTML 파일에서 CSS 파일을 직접 불러오거나 인라인  스크립트로 넣어주는 등의 처리가 필요하다. **이때 필요한 것이 `style-loader`**

### style-loader

Javascript로 변경된 스타일 코드를 HTML에 적용시켜주는 로더.

* 설치 및 설정

  ```bash
  $npm i style-loader
  ```

  ```javascript
  // webpack.config.js
  ...
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
              'style-loder',
              'css-loader'
          ]
        }
      ]
    }
  ...
  ```

  > :lipstick: use 배열안에 여러개의 로더를 적용시킬 수 있는데 순서는 **밑에서부터 위로 (배열 뒤쪽 요소에서 앞쪽 요소)** 적용되기 때문에 style-loader를 위에 적어주었다.****

### file-loader

CSS뿐 아니라 소스코드에서 사용하는 모든 파일을 모듈로 사용하게끔 할 수 있다. 

파일을 모듈 형태로 지원하고 웹팩 아웃풋에 파일을 옮겨주는 것이 `file-loader`가 하는 일이다.

가령 CSS에서 `url()` 함수에 이미지 파일 경로를 지정할 수 있는데 웹팩은 `file-loader`를 이용해 이를 처리한다.

* 설치 및 설정

  ```bash
  $npm i file-loader
  ```

  ```javascript
  // webpack.config.js
  ...
    module: {
      rules: [
        ...
        {
          test: /\.png$/,
          use: [
            'file-loader'
          ]
        }
      ]
    }
  ...
  ```

이렇게 설정 후 빌드하여 `index.html`파일을 열어보면 아래와같이 css코드로 변경되었음에도 배경 사진이 적용이 안된 것을 확인할 수 있다.

![bgImg](https://user-images.githubusercontent.com/52653793/95041075-9ecc6a80-0710-11eb-8494-fa7b6ebb4688.png)

이는 `index.html` 파일 입장에서는 해당 파일이 같은 경로가 아닌  `src` 폴더 안에 있기 때문에 발생한 에러이다.

`webpack.cofing.js` 를 아래와 같이 바꿔보자.

```javascript
// webpack.config.js

{
  test: /\.png$/,
  loader: 'file-loader',
  options: {
    publicPath: './dist/', 
    name: '[name].[ext]?[hash]'
  }
}
```

* `publicPath` - `file-loader`가 처리한 파일을 모듈로 사용했을 때 경로 앞에 추가되는 문자열
* `name` - `file-loader`가 파일을 output에 복사할 때 사용하는 파일명을 설정해준다
  * `[name]` - 원본 파일명
  * `[ext]` - 확장자명
  * `[hash] ` - 캐시 무력화를 위한 쿼리스트링 ( 정적 파일의 경우 성능을 위해 캐싱하여 사용하는 경우가 많다보니 같은 파일명을 사용하지만 파일이 바뀌었을 때 오작동 하는 것을 방지해주는 해쉬값 )

이제 빌드를 다시 해보면 경로와 파일명이 아래와 같이 적용되어 `index.html`이 정상 작동하는 것을 확인할 수 있다.

![fileLoader](https://user-images.githubusercontent.com/52653793/95041490-c7089900-0711-11eb-98ea-69218a453068.png)

### url-loader

사용하는 이미지가 많아지면 네트워크에 부담이 되고 사이트 성능에도 영향을 줄 수 있다.

만약 한 페이지에서 작은 이미지 여러개를 사용한다면 [Data URI](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)이라는 스키마를 사용하는 것이 좋다.

```
<img src="data:image/png;base64,iVBORw0KGgoAAA
ANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4
//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU
5ErkJggg==" alt="Red dot" />
```

`img태그`를 사용할 때 `src`에 이미지 경로를 입력하는데 위와 같이 **문자열 형태**를 입력할 수도 있다.

`데이터 포맷(image/png)`를 정하고 `인코딩 방식(base64)`, 그리고 `해당 값(iVB...)`을 적어주면 그것을 이미지로 랜더링 해주는 방식이다.

이미지 경로(주소)를 적어줄 때와 같은 네트워크 통신을 거치지 않고 이미지를 보여주기 때문에 보다 효율적이다.

<hr />

```javascript
import nyancat from './nyancat.jpg'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = `
    <img src="${nyancat}" />
  `
})
```

```javascript
// webpack.config.js
{
  test: /\.(png|jpg|gif|svg)$/,
  loader: 'file-loader',
  options: {
    publicPath: './dist/',
    name: '[name].[ext]?[hash]'
  }
}
```

위 처럼 file-loader가 jpg 파일에도 적용되도록 설정을 바꾸어 실핼해도 정상작동한다.

하지만 작은 크기의 nyancat은 굳이 파일을 dist에 복사할 필요 없이 바로 base64 인코딩하여 넣어주면 좋다.

* 설치 및 설정

  ```bash
  $npm url-loader
  ```

  ```javascript
  // webpack-config.js
  {
    test: /\.(png|jpg|gif|svg)$/,
    loader: 'url-loader',
    options: {
      publicPath: './dist/',
      name: '[name].[ext]?[hash]', // file-loader가 output에 복사할 때 사용하는 파일 이름
      limit: 20000,
    }
  }
  ```

  * `limit` - 해당 값 미만의 파일은 `url-loader`로,  이상의 파일은 `file-loader`로 처리한다.

    ![limit](https://user-images.githubusercontent.com/52653793/95042592-611e1080-0715-11eb-84f7-1dcac519595f.png)

실핼 결과, 용량이 큰 bg.png은 `file-loader`가 적용되어 `dist` 폴더에 적용되었고,

용량이 작은 nyancat.jpg는 `url-loader`가 적용되어 `Data URI` 값으로 적용된 것을 확인할 수 있다.

![fileLoader2](https://user-images.githubusercontent.com/52653793/95042666-962a6300-0715-11eb-8ad7-30fb38265916.png)

![result](https://user-images.githubusercontent.com/52653793/95042788-e99cb100-0715-11eb-9cd1-c5efabda3378.png)

## 4. 플러그인

로더가 파일 단위로 처리하는 반면 플러그인은 번들된 결과물을 처리한다. 즉, 로더와 다르게 한번만 실행된다.

번들된 자바스크립트를 **난독화** 한다거나 **특정 텍스트를 추출**하는 용도로 사용한다.

함수로 작성한 로더와 달리 플러그인은 클래스로 작성한다.

[커스터 플러그인](./06(웹팩-플러그인)/my-webpack-plugin.js)을 통해 플러그인이 어떻게 작동하는지 알아보자

### BannerPlugin

웹팩에 내장된 플러그인으로 결과물에 빌드 정보다 커밋 버전같은 것을 추가할 수 있다.

```javascript
// webpack.config.js
const webpack = require('webpack')
const childProcess = require('child_process')

plugins: [
  new webpack.BannerPlugin({
    banner: `
      Build Date: ${new Date().toLocaleString()}
      Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
      Author: ${childProcess.execSync('git config user.name')}
    `
  })
]
```

* `child_process` - 터미널 명령어를 실행시킬 수 있는 node 모듈

![banner](https://user-images.githubusercontent.com/52653793/95293063-b55bf880-08ad-11eb-8e1f-144c760a7f40.png)

* 이렇게 배너정보를 추가해서 빌드, 배포시 정적파일들이 잘 배포되었는지, 캐시에 의해 갱신이 안되는 것은 없는지 확인할 떄 사용한다.

### DefinePlugin

소스코드를 개발환경과 운영환영으로 나누어 운영한다. 가령 환경에 따라 API 서버 주소가 다를 수 있는데 그때마다 개발자가 직접 수정해주면 에러가 나기 쉽다. 이러한 환경 의존적인 정보는 소스가 아닌 다른 곳에서 관리하는 것이 좋다.

`DefinePlugin`은 이러한 환경 정보를 제공할 떄 사용한다. (웹팩 기본 플러그인)

```javascript
// webpack.config.js
const webpack = require('webpack')
...
plunins: [
    new webpack.DefinePlugin({})
]
```

* 빈 객체를 전달해도 기본적으로 노드 환경정보인 `process.env.NODE_ENV`를 넣어준다.

  웹팩 설정의 node에 설정한 값이 여기에 들어간다.

  ```javascript
  // app.js
  console.log(process.env.NODE_ENV) // 'development'
  ```

  * 현재 webpack mode인 development가 찍히는것을 확인할 수 있다.

```javascript
new webpack.DefinePlugin({
  TWO: '1+1',
  'api.domain': JSON.stringify('http://dev.api.domain.com')
})
```

* 이렇게 직접 환경 변수를 넣어줄 수도 있으며 **TWO** 라는 이름으로 전역에서 접근이 가능하며 **1+1**이라는 :lipstick: `코드`가 들어가는 것이기 때문에 **2**가 출력된다.

  ```javascript
  //app.js
  console.log(TWO) // 2
  console.log(api.domain) // http://dev.api.domain.com
  ```

* 코드가 아닌 `값`을 전달하고 싶다면 `JSON.stringify()`를 사용하면된다.

### HtmlTemplatePlugin

`HtmlTemplatePlugin`은 HTML 파일을 후처리하는데 사용한다. 빌드 타임의 값을 넣거나 코드를 압축할 수 있다.

* 설치 빛 사용

```bash
$npm i -D html-webpack-plugin
```

```javascript
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
...
plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
]
```

지금까지는 HTML 파일은 빌드하지않고, 다른 파일들만 빌드하여 HTML파일에서 main.js의 주소도 직접 입력하여 사용했는데 이제는 이 플러그인을 사용하여 HTML 파일도 빌드하여 전에 비해 동적인 html 파일을 만들 수 있다.

![htmlBefore](https://user-images.githubusercontent.com/52653793/95299601-f1e12180-08b8-11eb-9ed3-8ded855b8329.png)

> src/index.html

* index.html 파일에서 main.js를 직접 불러오지 않아도 된다.

빌드를 해보면, 지금까지와는 다르게 dist 폴더 안에 `index.html` 파일도 생긴 것을 확인할 수 있다.

![distIndex](https://user-images.githubusercontent.com/52653793/95299855-5603e580-08b9-11eb-888e-868b87a33b00.png)

> dist/index.html

* 자동으로 `main.js` 를 불러온다.( webpack output ) 

이렇게 HTML파일을 빌드 과정에 포함하기 때문에 보다 의존적이지 않은 코드를 만들 수 있다.

![error](https://user-images.githubusercontent.com/52653793/95300111-b004ab00-08b9-11eb-8668-75361a1469be.png)

> index.html의 경로가 바뀌면서 발생한 오류.

* `url-loader`에서 사용한 `publicPath`를 지워주면 해결된다.

**`HtmlTemplatePlugin`을 사용하면 HTML파일을 유동적으로 만드는데 용이하다**

#### 활용 01.

* [EJS](https://ejs.co/) 문법과 함께 개발 버전에 따라 title명을 다르게 만들기.

  ```html
  <!-- src/index.html -->
  ...
  <title>Document<%= title %></title>
  ```

  ```javascript
  // webpack.config.js
  ...
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        title: '이름 변경'
      }
    })
  ```

  * 결과

    ![title](https://user-images.githubusercontent.com/52653793/95300796-a0399680-08ba-11eb-83d2-6d1b243058a1.png)

  * 활용

  ```javascript
  // webpack.config.js
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        title: process.env.NODE_ENV === 'development' ? '(개발용)' : ''
      }
    })
  ```

  ```bash
  $NODE_ENV=development npm run build
  ```

  ```html
  <!--결과 - dist/index.html-->
  ...
  <title>Document(개발용)</title>
  ```

#### 활용 02.

* `minify`옵션을 통해 HTML파일 압축 및 주석 제거할 수 있다. 

  ```javascript
  new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        title: process.env.NODE_ENV === 'development' ? '(개발용)' : ''
      },
      minify: {
        collapseWhitespace: true, // 빈칸 제거
        removeComments: true // 주석 제거
      }
    })
  ```
  
* 결과

  ![result](https://user-images.githubusercontent.com/52653793/95301666-dd525880-08bb-11eb-847e-4cb33e4972a2.png)

  > 빈칸과 주석이 제거되고 한줄로 빌드된 것을 확인할 수 있다.

* 빌드 환경에 따라 `minify` 활성화 여부를 다르게 하여, 개발시에는 디버깅이 편하도록 옵션 끄기

  ![option](https://user-images.githubusercontent.com/52653793/95301891-2e624c80-08bc-11eb-9530-f516caf738bf.png)

### CleanWebpackPlugin

`CleanWebpackPlugin`은 빌드 이전 결과물을 제거하는 플러그인이다. 빌드 결과물은 아웃풋 경로에 모이는데 과거 파일이 남아있을 수 있다. 지금까지는 필요에 따라 dist폴더를 직접 삭제하고 다시 빌드했지만, 이 플러그인을 통해 이전 빌드 결과물을 빌드 때마다 지울 수 있다.

* 설치 및 사용

  ```bash
  $ npm i clean-webpack-plugin
  ```

  ```javascript
  // webpack.config.js
  // 다른 플러그인들과 다르게 default로 export되어있지 않아 아래와 같이 불러와야 한다.
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  ...
  plugins: [
    new CleanWebpackPlugin()
  ]
  ...
  ```

아웃풋 폴더에 임의의 파일을 생성후 빌드를 해보면 해당 파일이 삭제된 것을 확인할 수 있다.

### MiniCssExtractPlugin

스타일시트가 많아지면 하나의 자바스크립트로 결과물을 만드는 것이 부담일 수 있다. (∵브라우저에서 큰 파일 하나 로딩하는 것은 성능에 영향을 주기때문에 여러 개의 작은 파일을 동시에 다운받게 하는 것이 좋다.) 번들 결과에서 스타일시트 코드만 따로 뽑아서 별도의 CSS 파일로 만들어 역할에 따라 파일을 분리하는 것이 좋다. ( 최종 결과물이 자바스크립트 파일 하나, CSS 파일 하나 가 될 수 있도록)

* 설치 및 사용

  ```bash
  $ npm i mini-css-extract-plugin
  ```

  ```javascript
  // webpack.config.js
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  ...
  plugins: [
  	new MiniCssExtractPlugin({filename: '[name].css'})
  ]
  ...
  ```

  * 이 플러그인은 자바스크립트 코드에서 CSS를 뽑아내는 것이기 때문에 개발환경에서는 굳이 할 필요가 없기 떄문에 환경에 따라 실행되도록 변경

    ```javascript
    plugins: [
      ...(process.env.NODE_ENV === 'production'
        ? [new MiniCssExtractPlugin({filename: '[name].css'})]
        : []
      )
    ]
    ```

  * 그리고 이 플러그인은 다른 플러그인들과 다르게 loader 설정도 바꿔줘야 한다. 

    ```javascript
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [ 
            process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
            'css-loader',
          ]
        },	
      ]
    }
    ```

    > 배포환경일 떄는 MiniCssExtractPlugin이 제공하는 로더를 사용하도록 설정 변경

* 결과 (production 모드로 실행해보자)

  ```bash
  $ NODE_ENV=production npm run build 
  ```

  ![minicss](https://user-images.githubusercontent.com/52653793/95304124-1c35dd80-08bf-11eb-9639-aa85af151805.png)

  > 이전과는 다르게 main.css 파일이 생성된 것을 확인할 수 있다.

## 6. 심화

### 6.1 웹팩 개발서버

지금까지는 브라우저에서 파일을 직접 로딩해서 결과물을 확인했다.

인터넷에 웹사이트를 게시하려면 서버 프로그램으로 이 파일을 읽고 요청한 클라이언트에게 제공한다.

개발환경에서도 이와 유사한 환경을 갖추는 것이 좋다. 운영환경과 맞춤으로써 배포시 잠재적 문제를 미리 확인할 수 있다. 게다가 ajax 방식의 api 연동은 cors 정책 때문에 반드시 서버가 필요하다.

프론트 엔드 개발환경에서 이러한 개발용 서버를 제공해주는 것이 `webpack-dev-server`이다.

* 설치 및 사용

  ```bash
  $ npm i -D webpack-dev-server
  ```

  ```bash
    "scripts": {
      "start": "webpack-deb-server"
    },
  ```

  `npm start`를 해보면, 지금까지는 각 파일들을 직접 브라우저에 올려서 결과를 확인했는데 이제는 localhost:8080로 접속하여 결과를 확인할 수 있다.

* 기본 설정

  ```javascript
  // webpack.config.js
  module.exports = {
      devServer: {
          contentBase: path.join(__dirname, "dist"),
          publicPath: "/",
          host: "dev.domain.com",
          overlay: true,
          port: 8081,
          stats: "errors-only",
          historyApiFallback: true
      }
  }
  ```

  * `contentBase` - 정적 파일을 제공할 경로, 기본값은 `아웃풋`이다.

  * `publicPath` - 브라우저를 통해 접근하는 경로, 기본값은 `/`이다.

  * `host` - 개발환경에서 도메인을 맞춰야 하는 상황에서 사용한다. 예를 들어 쿠기 기반의 인증은 인정 서버와 동일한 도메인으로 개발환경을 맞춰야한다. 운영체제의 호스트 파일에 해당 도메인과 127.0.0.1 연결을 추가한 뒤 host 속성에 도메인을 설정해서 사용한다.

  * `overlay` - 빌드시 에러나 경고를 터미널이 아닌, 브라우저 화면에 표시한다

  * `port` - 개발 서버 포트 번호를 설정한다. 기본값은 `8080`

  * `stats` - 메시지 수준을 정할 수 있다. (메시지란, webpack-dev-server를 실행했을 때 터미널에 출력되는 것을 말한다.)

    `none`, `errors-only`, `minimal`, `normal`, `verbose` 옵션이 있다.

  * `historyApiFallback` - 히스토리 API를 사용하는 `SPA` 개발시에 설정한다. 404가 발생하면 index.html로 리다이렉트한다.

  이 외에도 개발 서버를실행할 때 명령어 인자로 `--progress`를 추가하면 빌드 진행율을 보여준다. 빌드 시간이 길어질 경우 사용하면 좋다.