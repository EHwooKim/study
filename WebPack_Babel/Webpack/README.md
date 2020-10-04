# 웹팩 (Webpack)

## 1. 배경

* 모듈 시스템 [app.js](./01/src/app.js), [math.js](./01/src/math.js)

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

* 도움말 확인

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

  * `--config` - 웹팩 설정 파일을 지정할 수 있다. [webpack.config.js](./02/webpack.config.js)

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

    

