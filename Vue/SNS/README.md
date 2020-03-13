# Vue - SNS

## ch1.

* Nuxt - 검색 엔진, 서버사이드 랜더링, PWA등을 쉽게 해결해주는 Vue의 상위버전(?) 느낌. React - Nuxt와의 관계 [공식문서](https://ko.nuxtjs.org/guide)
* :lipstick: vue(Nuxt)가 리액트(Next)보다 에러 메시지나 로딩중인지 등을 잘 보여줘서 `DX(Developer eXperience)- 개발자 경험` 측면에서 vue가 리액트보다 좋다.  
* Vue.js@2 - Nuxt@2, MySQL@5.7, Node@10

```bash
$ npm i vue nuxt
```

* Nuxt는 웹 사이트를 위해 vue를 확장 시킨 것이라 컴포넌트가 아닌 페이지 단위가 중요하기에 폴더명을 `pages`로 해야만 한다. **pages 폴더 내의 파일 이름에 맞게 주소까지 할당해준다.**

* nuxt 실행해보자.

```bash
npm run dev  # nuxt 실행
```

> universal 이라는 것은 서버사이드 랜더링이 되고 있다고 보면된다(클라이언트쪽, 서버쪽 모두 접근 가능하다)

* 만약 `localhost/user/zerocho/` 와 같은 경로의 페이지를 만들고 싶다면, 이 주소를 폴더 구조로 생각하면 쉽다. pages 폴더 안에 user 폴더안에 zerocho 라는 파일.

  * 그럼 유저가 수백만명이면 파일이 수백만개를 만들어야하나? - 아니겠죠 나중에 알아봅시다.

* vue에서 라우팅은 눈속임이다.(페이지가 하나인데 컴포넌트를 바꾸고 history api를 바꾸면서 화면을 보여준는 것)

* 그런데 nuxt의 페이지들은 개별적인 페이지들이다. 이것은 `코드 스플리팅`이라는 개념이 들어간 것으로 vue  vue 라우터를 사용할 때 페이지 수백만개는 컴포넌트 수백만개를 바꿔가는 방식인데 그렇다보니 그 컴포넌트들을 모두 로딩해야 페이지가 보인다. 내가 원하지 않는 페이지까지 모두 불러오게 되니 비효율적이다. 이것을 해결하는 것이 `코드 스플리팅`이고 Nuxt는 페이지 단위로 이것이 적용되어있어 별개의 페이지이다. 그런데 별개의 페이지일떄는 페이지가 넘어갈 때 깜빡이며 페이지가 넘어가는 단점이 있지(그래서 vue를 썬던거고). 그런데 코드 스플리팅이라는 기술은 페이지가 깜빡이지 않고 미리 페이지들을 미리 불러와서 다른 페이지로 바로 넘어갈 수 있다(마치 앱처럼) 즉, Nuxt는 페이지에서 코드스플리팅을 하면서 기존 vue와 같이 UX까지 신경 쓴 프레임워크이다.

* 코드의 중복을 줄여주는 `layouts` 폴더 -> `default.vue` 파일을 `App.vue` 파일처럼 사용하면 된다.

* 새로운 파일, 폴더를 Nuxt가 못읽으면 서버를 다시 켜보자.

* 웹 사이트를 만들다보면 같은 기능을 하더라도 레이아웃은 다를 수 있다. 이럴 경우 Nuxt는 `layouts` 폴더에 새로운 레아이웃을 만들고(admin.vue), 해당 레이아웃이 적용될 pages의 `export default`에  `layout: 'admin' `이라고 적용하면 레이아웃이 default가 아닌admin 레이아웃이 적용된다.

* `nuxt.config.js`는 nuxt에 대한 설정을 담당하는 파일이다.

### vuetify 

```bash
$ npm i vuetify @nuxtjs/vuetify
```

* nuxt는 외부라이브러리 연결이 조금 독특하다.

  * vue에서는 `Vue.use(Vuex)`와 같이 연결했었는데 Nuxt는 페이지가 하나가 아니라 여러개라서 모든 페이지에 `Vue.use(Vuex)`를 해줘야하다보니 중복이 너무 많기에 다른 방법을 쓴다.

  * [nuxt.config.js](./ch1/front/nuxt.config.js)에서 관리한다.

    
### eslint

* 실무에서 여러사람이 함께 일하다보니 서로 코딩하는 스타일이 다른데 코딩 스타일은 하나로 통일하는게 좋다. `eslint`가 가장 유명하고 많이 쓰인다.

* 설치

  ```bash
  $ npm i -D eslint eslint-plugin-vue
  ```

* 폴더에 [.eslintrc](./ch1/front/.eslintrc) 파일 생성.

  * eslint에 대한 설정을 적는 파일

  * 각종 설정들을 적어주고 package.json에 다음 추가

    ```bash
    # package.json
    "scripts" : {
	"lint": "eslint **/*"  # 모든 파일을 검사한다는 의미의 **/*
    }
    ```
    
  * eslint  적용시키고 싶지않은 파일이 있다면 `.eslintignore` 파일을 만들어 적어준다
  
  * 그 이후 `npm run lint`를 하면 막 오류가 뜰거야..
  
  * `eslint-plugin-vue`도 설치해줘서 vue에 대한 코딩 스타일도 같이 적용시켰다.
  
* `error` 는 정말 고쳐야 하는 그런 코드에 대한 메시지

* `warning`은 반드시 고칠 필요는 없는 코드에 대한 메시지

* 사용하는 에디터 프로그램과도 연동이 가능하고 연동을 해놓으면 terminal이 아닌 에디터에서 바로 확인 가능

## ch 2.

* `.nuxt` 폴더는 nuxt 개발환경, 배포환경으로 build할 때 그 결과물들이 들어가는 폴더로 자동으로 생성된다.
* 모듈 집어넣고 코스 스플릿팅, 서버사이드 렌더링 등 할 거  모두 한 결과물
* 빌드가 꼬이면 지우고 다시 설치하는 것도 하나의 해결 방법..

### vuex

* 클래식 모드

  * 일반적으로 사용하는 store 하나만 사용하는 모드.

* **모듈** 모드
* store를 여러개 만들어서 기능별로 관리할 수 있는 모드.
  * **모듈**이기 떄문에 클래식모드와 사용방법에서 약간의 차이가 있다.
* nuxt 가 store 폴더를 알아서 보고 있기 때문에 Vue.use(Vuex) 등 **따로 연결을 안해줘도 된다**

* `store`폴더 안에 있는 `index.js` 가 기본 vuex store가 되고 나머지 파일들은 모듈이 된다.
* state만 `함수`형태이고 나머지는 `객체`로 export

* `mutations`는 비동기 작업이 있으면 안된다. (setTimeout, promise, ajax요청 등...)
  * 만약 서버가 있다면 로그인, 로그아웃, 게시글 작성 등 모두 서버에 요청을 보내고 응답을 받아야하잖아, 그러니 그런 것들은 actions에서 한다. 

#### actions

* actions의 인자로 넘겨주는 **context**는 `객체`로 `{ commit, dispatch, state, rootState, getters, rootGetters... }`와 같은 형태로 되어있다.
  * 비동기작업, 동기작업 등 다양한 작업을 할 수 있도록 만들어졌기 떄문이다.
  * `commit`로 mutations를 실행
  * `dispatch`로 actions를 실행
  * state, getters도 사용 가능하고, rootState, rootGetters로 `index`모듈의 state, getters도 사용 가능하다.
  *  :lipstick:dispatch로 action을 실행 시켰을 떄마다주의해야 하는 것이 action은 **비동기** 라는 것이다. 회원가입이 완료 된 후 메인페이지로 가야하는데 비동기를 신경 쓰지 않으면 회원가입 실패했을 떄도 메인페이지로 가는 경우가 생긴다!!! :lipstick:
  * `dispatch`는 자체적으로 **promise**이기 떄문에 `.then`을 사용하면 된다.
* `mutations`와 다르게 vueDevtools에 기록이 남지 않는다.
  * 그렇기 떄문에 최대한 mutations를 활용하는 것이 개발에 도움이 되기도 한다.

#### 같은 이름의 actions 호출

* `add` action이 index.js 와 post.js 두 곳에 있다면?

  ```javascript
  add({commit}, payload) {
      commit('addMainPost', payload(or null), { root: true })
  } // 위와 같이 root 옵션을 통해 index의 addMainPost 호출 가능, (기본값 false)
  ```

  

## ch 3.

### 라우터 미들웨어

* 로그인 상태에서 회원가입을, 로그아웃 상태에서 프로필 페이지를 갈 일이 없으니 페이지 이동시 무언가를 처리해주는 것. vue-router에서 `beforeRouterEnter`와 같은 기능.
* 로그인 상태, 로그인 안한 상태, 관리자 상태 등을 판단하거나 다른 행동을 할수 있다.
* 페이지가 마운트되기 전에 미들웨어가 실행된다.
  * `middleware` 폴더에 판단을 위한 파일을 만들고 해당 판단이 필요한 폴더의 middleware에 추가하면된다.

### 동적 라우팅

* Nuxt에서 동적라우팅은 `폴더/파일` 이 곧 주소가 된다. 동적인 부분인 파일명은 `_id.vue`와같이 언더스코어를 붙여 짓는다.

### 무한 스크롤

* 프론트엔드 개발자 입장에서 전체 게시글의 개수가 몇개인지 모르고 서비스가 커질 수록 그것을 알려고 하는 것이 db에 무리를 줄 수도 있다.

* 게시물을 10개씩 가져올건데 그러다가 10개보다 적게 가져오게 되면 그게 마지막 페이지라는 것을 알 수 있겠지

* `window.scrollY` : 내가 스크롤을 얼마나 올리고 내렸는지 알려주는 속성

* `document.documentElement.clientHeight` : 해당 클라이언트의 세로 높이 - 지금 당장 눈에 보이는 화면

* `document.documentElement.scrollHeight` : 화면 최상단에서 부터 스크롤을 전부 내렸을 때 최하단까지의 길이 - 스크롤을 포함한 화면

* 위의 세가지로 인해 생기는 규칙

  * 스크롤을 끝까지 내렸을 때

    > window.scrollY + document.documentElement.clientHeight === document.documentElement.scrollHeight

  * 그렇기 때문에 만약 스크롤이 밑에서부터 100만큼 위에 있을 때 뭔가를 작동시키고 싶다면 

    ```javascript
    window.scrollY + document.documentElement.clientHeight === document.documentElement.scrollHeight - 100 
    ```

    > 이런식으로 해주면 되겠지.  그런데 ===로 비교를 하게 되면 스크롤을 확 내렸을 떄가 계산이 안되기 떄문에 > 로 해주어야한다.

* 지금까지 구현한 무한 스크롤에 **실무**에서는 **스로틀링이 추가되고 limit을 이용해서 데이터를 가져오지 않는다**

  * `스로틀링`을 적용하는이유는 더미데이터는 바로바로 가져올 수 있지만 백엔드가 있으면 서버와 통신하는 시간이 필요하다! 인터넷이 느려 가져오는데 10초가 걸린다면? 사람들은 기다리지 못하고 스크롤을 엄청 움직이고 요청이 계속 가겠지.. 그걸 막기위한 것이다.
  * `limit` 기반으로 하지 않는 이유는 게시글을 중간에 삭제하고 새로 쓰고 하면서 totalPosts가 실시간으로 바뀐다. 그래서 마지막으로 불러온 게시글 id 이후로 10개 불러오기 이런식으로 가져온다.

### virtualized list

> 직접 만들어 쓰기는 어렵고 제일 유명한 [라이브러리](https://www.npmjs.com/package/vue-virtual-scroll-list)를 사용한다.

* 화면에 보이는 애들만 살려두고 나머지 위, 아래에 안보이는 애들은 없애는 방식. (메모리 상에는 아이디정도만 남겨둔다)

* 지금 보여주는 애들, 안보이게 처리한 애들, 화면 갑자기 내렸을때 보여줄 벤치들 등 생각할게 많다...

* 단점이랄게 있다면 화면의 높이를 알아야 한다. 그래야 화면 어다끼자 보이고 안보이고를 하는데 게시글 길이, 이미지 높이와 같은 것들 때문에 각각의 카드를 계산하기가 어렵다.. 그렇다보니 쓰기 위해서는 무슨 수를 써서라도 카드의 높이를 통일시켜주는 것이 편할 것이다... 방금 말한 가변 높이를 위한 조치도 이미 라이브러리에 있지만 쉽지 않을 거야...

## ch.4

### npm

* `npm outdated` : 업데이트된 모듈 목록을 볼 수 있다.

* `npm update` : 모듈을 업데이트 해준다.

  * 모듈 업데이트 후 bash 마지막 줄에

    ```bash
    found 0 vulnerabilities     ```

    이부분이 취약점의 개수를 알려주는데 이 숫자가 `0`이 아닐시 아래의 명령어를 입력해준다.
    ```

* `npm audit fix` : 자동으로 취약점을 고쳐준다.

### HTTP

* `req (요청)`
  
  * GET/ naver.com/user/1  - 요청 서버 주소
    * GET : 가져오다
    * POST : 생성하다  
      * // POST로 보낸다고 더 안전하거나 그런거 없이 그냥 의미만 담는다. 암호화는 `HTTPS`를 통해서..
    * PUT : 전체 수정
    * PATCH : 부분 수정
    * DELETE : 삭제
    * OPTIONS : 찔러보기
    
    > 그런데 모든 행동이 위의 6가지 경우에 항상 맞아 떨어질 수는 없다. '게시글 가져오면서 조회수 1늘리기' 같은 동작을하려면 get..? 부분수정이디 patch..? 헷갈릴 수 있는데 애매하면 그냥 post 쓴다.
    
  * header - 요청에 대한 데이터 ( 형식에 맞는, 정해진 데이터만 넣을 수 있다)
  
    > 관리자 도구 Network에서 Headers부분에 정해진 데이터 확인 가능... 종류가 많다..
  
  * body - header에 못 넣는 데이터, ( 그외의 데이터를 다 body에 넣는다.)
  
    > 관리자 도구 Headers 밑에 보면 payload라고 있는데 그게 body이다.
* `res (응답)`
  * 200 / 400 / 50- 요청을 받을지 말지, 에러를 보낼지.
  * header - 응답에 대한 데이터
  * data - header에 못 넣는 데이터
* https는 암호화랑 관련되어있다. (주소뒤에 포트 443이 숨어있다, http 포트는 80)





### express

* back 폴더에서

  ```bash
  $ npm init
  $ npm i express
  ```

* package.json에서 main을 `app.js`로 변경 후 `app.js`파일 생성

  > main이 의미하는 것은 가장 중요한, 가장 먼저 보는 파일.
  
* `node`에서는 `import - export` 쓰지 않고, `require - module.exports`를 사용합니다.
  
  * 간략한 역사 : 
  
    `require - module.exports`는 common.js 문법인데 이 문법을 node가 채택 후 ECMAscript에서  `import - export` 문법을 만들어냈기 때문에 지금까지 node는 `require`, 브라우저는 `import` 이렇게 따로 사용중이다.
  
* 보통 서버에 요청을 보낼 떄 `json`으로 보내는데 `express`는 json을 못받는다.. 그래서 뭔가 해줘야하는데!

  ```javascript
  // app.js
  app.use(express.json()) 
  ```

* `app.use`를 통해 req와 res를 조작할 수 있고 **middleware**라고 부른다.  `app.get`, `app.post` 들도 middleware이기에 `express`는 **middleware**만 알면 다 안다고 할 수 있다.

### DB - sequelize

```bash
$ npm i sequelize mysql2
```

* `sequelize` : 자바스크립트로 SQL을 표현하게 해준다. DB와 상관 없이 쓸 수 있다.
* `mysql2` : mysql DB를 설치한게 아니라 node와 mysql을 이어주는 드라이버.

```bash
$ npm i -D sequelize-cli
```

* 개발모드로 설치
  * -g 로 글로벌에 설치하기도 하는데, 이것을 설치하면 이제 terminal에서 `sequelize`을 명령어로 사용할 수가 있는데 글로벌 설치는 문제가 **package.json**에 기록이 안된다고 그랬지!  그래서 명시해주기 위해 -D  설치.

```bash
$ npx sequelize init
```

* 설치하면 각종 폴더들이 생긴다.
* `npx`는 package.json에서 패키지들 중 글로벌 설치가 아닌 `dependencies`나 `devDependencies`에 설치한 것도 `npx sequelize init`처럼 명령어로 쓸 수 있게 해준다. 명령어로 쓸 수 있게 해주는 기능 외에는 없어서 이번 프로젝트에서는 이제 잊어도 된다.
* `sequelize init` : config, migrations, models, seeders 파일을 만들어준다. node랑 sequelize를 연결할 떄 설정을 편하게 해준다. 그런데 코드가 마냥 좋지는 않아서 수정해서 쓰는게 좋다..(강의 때는 models -> index.js 수정 함.)
* `config.json`이 DB랑 관련된건데 개발용 DB인 `"development"` 의 username, password, databse 바꿔주고.. 나중에 배포 DB인 `"pproduction"`도 나중에 바꿔줄 예정
* app.js에 db를 실행하는 코드인 `db.sequelize.sync()`를 적어줘야 서버 실핼할 떄 db도 실행시킨다.
* 회원가입을 위한 user model 생성, index.js와 연결 등을 하고 npm run dev 를 하면 알아서 db가 업데이트된다.

### nodemon

```bash
npm i -D nodemon
```

> 수정된 코드를 서버에 적용시키려면 서버를 껐다 켜야하는 귀찮음이있다. 그것을 해결해주는 것이 `nodemon`

* 설치 후 `package.json` - `scripts` 에서 `"dev": "nodemon app.js"` 으로 수정해주면 된다.
* 서버 재실행은 필요없지만 새로고침은 필요하다 ㅋ

### db 생성

* 모델등을 다 정의하고 db를 생성하는 방법
  1. mysql에서 직접 만들어 준다.
  2. `npx sequelize db:craete` 명령어를 입력한다.

### CORS 에러! (악명높은..)

* ajax 요청이 다른 포트(서버)에서 오게되면 요청을 막아버린다. 서버쪽에서 주소를 허용해줘야 해결된다..

```bash
$ npm i cors
```

 ```javascript
//app.js
const cors require('cors')
...
app.use(cors()) // 모든 요청 다 허용하는 코드, 하지만 실무에서 이렇게하면 절대 안돼

app.use(cors('http://localhost:3000'))  // 실무에서는 이렇게 요청 주소 정확히 적어라
 ```

### 비밀번호 암호화

* `bcrypt`
* `scrypt`
* `pbkdf2`

> 중에 한가지 쓰면 웬만하면 안털려, 이번엔 bcrypt 사용

```bash
npm i bcrypt
```

> 그런데 bcrypt는 자바스크립트로 만들시 속도문제 떄문에 다른 언어로 만들어졌다. 그렇다보니 설치과정에서 오류가 뜨니 공식문서 참고해가며 설치하자.

또는 아래의 명령어를 먼저 입력하고, `bcrypt`를 설치하자.

```bash
npm install --global --productio n windows-build-tools 
```

### 중복가입 방지

* back에서 해당 이메일이 이미 있는지 체크하고 거절코드를 보내는 방법

* db에서 중복을 원치않는 모델에 unique:true 옵션을 추가하는 방법

  * 그런데 db, 스키마를 변경하면 그게 자동으로 반영되지 않는다. 마이그레이션을 해주거나 workbanch에서 옵션을 바꾸거나 등등 해줘야한다.

  * 개발시에는 간단하게

    ```javascript
    // app.js
    ...
    db.sequelize.sync({ force: true })
    ...
    ```

    > 이렇게 하면되는데, 서버 재시작 때마다 기존 데이터를 싹 날리고 다시 만드는거라 실무에서는 절대 쓰지말자..


### 로그인 - passport

* 프론트에서 로그인 요청이 오 면 백에서는 당연히 그 요청을 받아줘야하고(route생성)
* `로그인 상태`라는 것이 딱 정해져있는 것이 아니다. 서비스에서 정하기 나름.
  * 이번에는 로그인 요청한 사용자가 있다면 서버에서 세션(메모리)을 만들어서 거기에 사용자 정보(권한, 게시글수, 팔로잉 등)를 담아 그 다음 요청시마다 세션을 먼저 검사하여 권한 등을 검사를 하게 하겠다.
  * 세션 구현도 구현 나 름이긴한데... 실무에 맞게 하자면 `passport` 모듈을 많이 사용한다.

```bash
$ npm i passport passport-local
```

> passport : 로그인 도와주는거
>
> passport-local : 로그인의 종류도 일반로그인 세션로그인 등 다양한데 일반 로그인만 할거면 local 다른 소셜 로그인을 하려면 passport-kakao 등 설치
>
> jwt 로그인 또한 passport-jwt 사용하면 된다.

* `passport` 폴더 생성, `index.js`생성 및 작성
* `app.js`에 연결할거 하고 session도 쓸거니까 설치

```bash
$ npm i express-session 
```

* app.js에서 연결 및 설정
* session을 쓰면!? `cookie`도 쓴다!  쿠키 해석을 위해 설치

```bash
$ npm i cookie-parser
```

* 설치한 김에

```bash
$ npm i morgan
```

> 요청이 들어오면 기록을 해준다.

#### 쿠키 세션

세션이 메모리라 그랬지, js에서 객체같은 것을 만드는 것도 js 힙이라는 곳에 메모리로 존재하는데 예를 들어 세션이 아래와 같이 보통 저장되는데

```ja
const user = {
  'asdasgsdxfgvxdcv': {
    nickname: 'ehwoo',
    emaile:: 'ehwoo@naver.com'
  },
  'aasdafaewfsdasgsdxfgvxdcv': {
    nickname: 'ehwoo2',
    emaile:: 'ehwoo2@naver.com'
  },
  'ppojoigasdafaewfsdasgsdxfgvxdcv': {
    nickname: 'ehwoo3',
    emaile:: 'ehwoo3@naver.com'
  },
}
```

프론트에서 요청을 보낼 때 key `asdasgsdxfgvxdcv`를 같이 백엔드로 보내준다. 그러면 백엔드는 `express-session`에서 이 key를 찾는데! 이 key가 바로 `cookie`다. (저 key를 보통 `cookie`에 넣어서 보내준다.) 그 쿠키를 기반으로 사용자가 누군지 찾는다. 사용자가 로그인 요청을 하고 인증이 성공하면 프론트에 쿠키를 프론트에 심어놓고 서버에 요청할 떄마다 그 쿠키를 헤더에 넣어서 같이 보내주고 백엔드는 요청에서 해당 쿠키를 `req.cookie.[connect.sid]` 에서  꺼내 해석하여 요청보낸 사람을 판단한다.

* 로그인 과정을 간단하게 정리해보면
  1. db에서 email, password 검사를 하고
  2. 일치한다면 세션에 쿠키랑(쿠키를 key로 삼아서) 객체(정보) 저장
  3. 프론트에 쿠키 내려보내주기 

### passport

* `전략(Strategy) ` - sns별로 로그인할 수 있는 방법이 많은데 그것을 전략이라는 틀을 만들어서 어떤 로그인이든 이 틀만 맞춰주면 되게끔 해주는 것 (passport/local.js)


* 세션 저장시 저 위에 처럼 모든 정보를 있는 그대로 저장하면 이용자가 늘었을 때 서버가 터진다.. 그래서 다음과같이 user.id만 따로 저장하는 방식을 쓴다.

```javascript
const user = {
  'asdasgsdxfgvxdcv': 1,
  'aasdafaewfsdasgsdxfgvxdcv': 2,
  'ppojoigasdafaewfsdasgsdxfgvxdcv': 3,
}
```

* 이렇게 user.id만 따로 저장하는 것을 해주는 것이 `passport.serializeUser`

### 로그인 순서 정리

프론트에서 이메일, 비밀번호 담아서 `/user/login` 주소로 post요청 **=>** `req.body.email`, `req.body.password`에 해당 정보 담겨있는데 그 이유는 `app.use(express.json())`, `app.use(express.urlencoded({ extended: false }))`에서 `req.body`를 만들어주기 떄문이다.  **=>** 받은 정보를 `passport.LocalStrategy`에 보낸다 **=>** 받은 정보를  전략(Strategy)에서 검사를 하여 `에러`, `성공(유저 정보포함)`, `실패` 등 정보를 다시 이전 콜백함수(passport.authenticate)로 보낸다 **=>** `req.login`을 통해 세션에 사용자 정보(id만 - serializeUser가 해준다) 저장하고, 프론트에 `header`에는 쿠키를, `body`에는 사용자 정보를 담아서 보낸다.



* 로그인 후에이제 매번 deserializeUser가 실행되는데, 요청 떄마다 결국 db에 접속하는거니 좋지않다. 그래서 실무에서는 캐싱처리를 하는데 그 떄 보조 db로 `redis`를 주로 사용하고, deserializeUser요청 역시 메인 db가 아닌 redis쪽으로 요청을 바꿔주면 된다.

### 로그인 - 프론트

* 쿠키가 왜 안들어올까.. => 지금 백, 프론트 주소가 서로 다른데 그럴 경우에 쿠키가 안들어올수가 있다.

  * 그럴때는 요청을 보낼 때 세번 째 인자로 `withCredentials: true`를 넣어주자 

  * 그렇게 하니 또 CORS 에러가 뜨네 하하.

    ```javascript
    //app.js
    app.use(cors('http://localhost:3000')) //였던 코드를
    
    app.use(cors({						   //이렇게 CORS에도 credentials 옵션 추가!
      origin: 'http://localhost:3000',
      credentials: true,
    })) 
    ```

  * 와 이제 쿠키가 `connect.sid`에 잘 들어온다.

  * 이렇게 쿠키가 한번 심어지게 되면 connect.sid가 req.cookie에 요청시마다 들어가게 된다.

  * 현재 쿠키에는 user.id만 들어있잖아(serializeUser에 의해) 그런데 우리가 원하는 것은 사용자의 정보.



### 로그아웃

* 로그아웃은 굉장히 간단하다. `req.logout()`만 해주면 끝.

### 라우터 분리

* 지금 `app.js` 코드에 유저 등록('/user'), 로그인('/user/login'), 로그아웃('user/logout') 이 모두 공통적으로 `/user`를 가지고 있고 `app.js` 코드가 너무 길어졌다. => **라우터 분리 필요**
* `routes` 폴더 생성
  * users 파일 생성 후  유저관련 코드 복붙 => `app.post` 등을 `router.post`로 바꾸고, 라우터명인 user를 요청 주소에서 뺴준다.
  * 라우터도 모듈, 미들웨어 이므로 app.js에서 연결 해준다.

### 1 : N 관계

* `model` 을 정의 할 떄 `associate` 에 모델들 간의 관계를 정의해 줄 수 있다.

### N : N 관계

* `belongsToMany`

* N : N 관계는 1 : N 처럼 각각의 테이블에 바로 연결하는 방식으로는 제대로 설명하기가 어렵다

  * Hashtag 하나에 여러개의 PostId를 넣는 방식으로 억지로 할 수도 있겠지만...

    | hashtag_id | hashtag | postid  |
    | ---------- | ------- | ------- |
    | 1          | #vue    | 1, 2, 3 |
    | 2          | #react  | 2       |

  * **대부분의 db가 이 방식을 허용하지 않는다.**

* 그래서 두 테이블의 관계를 설명해주는 중간 테이블을 하나 더 만들어서 둘의 관계를 설정한다.

  | hashtag_id | post_id |
  | ---------- | ------- |
  | 1          | 1       |
  | 1          | 2       |
  | 2          | 1       |

  > PostHashtag 테이블.

```tex
그리고 이렇게 sequelize로 관계를 설정해주면
post.addImage, post.getImage, post.setImage, post.removeImage 등 뒤에 모델명이 붙은 메서드를 알아서 만들어준다.
그렇다고 이 자동으로 만들어진 메서드를 남용하면.. 나중에 db명령어 복잡해졌을 떄 안될때가 있어서..
db.sequelize.query('SELECT * FROM') 같이 쓸수있는데 이렇게 직접 쿼리를 날려주는 것도 방법이다.
```



### image

* 이미지를 db에 직접 하나씩 넣는 방법도 있지만,  **보통 db에 넣지는 않는다**
*  이미지는 한번 저장하면 수정,삭제할 일이 드물고 읽기 전용이다.
* 그리고 이미지는 용량이 크다보니 db에서 직접 읽는 것은 db에 무리를 준다.
* 메인 db가 터질 것을 대비하여 보조 db들을 만들어 거기에 또 이미지를 저장하면 용량도 너무 많이 차지한다.
* 그래서! `파일 스토리지(fs)`에 넣고 캐싱(cdn 같은거)을 붙여서 캐싱할게 해주는 방식으로 한다! 

> ( 하지만 배포 전까지는 못 써서 .. 일단은 db에 저장하다가 fs로 넘어가겠다.)

* db 서버에 저장하기엔 용량이 크니 일단 `백엔드 서버`에 저장해 놓고 해당 주소를 db에 저장하는 방식을 우선 사용하겠다.

### 미들웨어 추가 - 로그인 검증

```javascript
  if (req.isAuthenticated()) { 

  }
```

> 이 코드를 통해 로그인한 사용자인지 등을 체크 할 수 있는데 굉장히 자주 사용되어 중복이 심하다

**=>미들웨어로 뺴줄 수가 있다**

* router자체도 미들웨어지만 (routes 폴더에서 사용한 그 router), 미들웨어에서 다른 미들웨어 사용도 가능하다.

* routes 폴더에 `middlewares.js` 생성

  ```javascript
  exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    return res.status(401).send('로그인이 필요합니다.')
  }
  ```

  > 위와 같이 미들웨어 작성 후

  ```javascript
  // routes/post.js
  ...
  
  router.post('/images', (req, res) => {
    if (req.isAuthenticated()) { 
  
    }     
  })
  // 위의 코드를 아래와 같이 미들웨어 처리하면 된다.
  const { isLoggedIn } = require('./middlewares')
  ...
  router.post('/images', isLoggedIn, (req, res) => {
  
  })
  ```



### exports, module.exports

* node에서는 기본적으로 `require`, `modeule.exports`를 사용하여 보통 `module.exports`로 대표적인 것들을 exports한다. 

* 다른 방법으로 ` exports.something` 이 있는데 이것은 무언가를 대표하지는 않지ㅏㅁㄴ 비슷한 것들(?)을 만들 때 사용한다. 

  * 이는 'exports'가 객체이기때문에 (exports === {}) 그래서 exports의 속성값을 추가하는 것이다

  ```javascript
  exports.isLoggedIn = (req, res, next) => { //그래서 이 코드는
  }
  exports = { // 이 코드와 같은 코드이다.
    isLoggedIn: (req, res, next) => {}
  }
  ```

  * 그렇기 때문에 `require`를 통해 불러올 떄도 `module.exports`와는 다르게

  ```javascript
  // 객체를 구조분해하여 아래와 같이 불러오는 것이다
  const { isLoggedIn } = require('./middlewares')
  ```

* 이때 주의할 것 :lipstick:

  *  `exports.something` 보다 `modules.exports` 가 우선시 되기 때문에 두개를 같이 쓰면  **exports.something 의 코드는 없는 것이 되어버리기 떄문에 둘 중 하나만 써야한다.**
  * 만약 `module.exports`만을 이용하여 코드를 짜고싶다면 아래와 같이 사용하면 된다.

  ```javascript
  module.exports = {
    isLoggedIn: (req, res, next) => {},
    isLoggedOut: (req, res, next) => {},
  }
  ```

### 이미지 업로드

* 이미지 따로, 게시글 따로 올려서 나중에 합치는 방법을 사용합니다. (이미지 하나로 길게 작성한 글이 날아가거나 그럴 수 있기도하고 이미지는 압축도 필요한데 압축하고 fs에 저장하고 불러오고 하는 등의 시간이 오래 걸릴 수 있으므로 따로 올린다.)

#### Form data에 대한 이해 필요

* `type="file"` input에 이미지를 선택하여 저장하면 아래와 같은 meta data만 나온다.

  ```
  FileList {0: File, 1: File, length: 2}
      0: File
          lastModified: 1572518611654
          lastModifiedDate: Thu Oct 31 2019 19:43:31 GMT+0900 (한국 표준시) {}
          name: "KakaoTalk_20191031_192037148_14.jpg"
          size: 106910
          type: "image/jpeg"
          webkitRelativePath: ""
          __proto__: File
      1: File
          lastModified: 1572518614694
          lastModifiedDate: Thu Oct 31 2019 19:43:34 GMT+0900 (한국 표준시) {}
          name: "KakaoTalk_20191031_192037148_15.jpg"
          size: 112755
          type: "image/jpeg"
          webkitRelativePath: ""
          __proto__: File
          length: 2
          __proto__: FileList
  ```

* 이미지는 json이 아니고 바이트인데, 지금까지의 요청들은 json 데이터를 보내왔잖아 (로그인 회원가입 등). 그래서 보통 이미지 업로드 때는 formdata를 사용한다.

  ```javascript
  const imageFormData = new FormData()
  ```

  ```
  // 이런 FormData 형태로 오는데 이거를 해석하기 어렵거든.. 그래서 패키지의 도움을 받자.
  ------WebKitFormBoundaryl8wANn2BjUPAcTJZ
  Content-Disposition: form-data; name="image"; filename="KakaoTalk_20191031_192037148_11.jpg"
  Content-Type: image/jpeg
  ```

### multer - 이미지 업로드

* 설치

  ```bash
  $npm i multer
  ```

* FormData 해석을 도와주는 패키지.

```javascript
router.post('/images', upload.__method__ ,aisLoggedIn, (req, res) => {
})
```

* upload 메소드
  * `upload.single` :  파일 하나 업로드
  * `upload.array` : 같은 키로 여러개 업로드 (image라는 키로 여러개)
  * `upload.fields` : 다른 키로 여러개 (image1, image2 로 여러개)
  * `upload.none` : 파일 업로드 안한다.

* multer의 역할

  1. `multer의 역할은 formdata 해석 후 uploads 폴더에 저장을 해주고`

  2.  `req.files 안에 업도르한 파일의 정보를 배열로 넣어준다.`

     ```
     req.files = [{ filename:'웃는얼굴20200202.png' }, { filename:'메가폰20200202.png' }]
     ```

     > 이것을 프론트로 filename만 뽑아서 보내줘야한다.
  
* 프론트에서 이미지 보이게 하기.

  * 이미지를 업로드 시켰는데 화면에 불러오지를 못한다

  * 이미지와 같은 정적파일을 불러오기 위해서는 미들웨어 하나 써줘야한다.

    ```javascript
    app.use('/', express.static('uploads')) 
    ```

    > 이미지와 같은 정적인 파일을 불러오기 위한 미들웨어. uploads 폴더에 있는 것들 기본주소 '/'로 불러올수 있게도 바꿔준거. '/uploads'로 적어주면 uploads 폴더안에있는 것을 uploads로 가져오기 인데, 프론트랑 백을 주소 다르게 해주는게 좋다. 왜냐하면 프론트에서 백의 폴더 구조를 알게되면 보안상의 문제가 있기떄문에!