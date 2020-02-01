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