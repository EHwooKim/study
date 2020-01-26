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

## vuetify 

```bash
$ npm i vuetify @nuxtjs/vuetify
```

* nuxt는 외부라이브러리 연결이 조금 독특하다.

  * vue에서는 `Vue.use(Vuex)`와 같이 연결했었는데 Nuxt는 페이지가 하나가 아니라 여러개라서 모든 페이지에 `Vue.use(Vuex)`를 해줘야하다보니 중복이 너무 많기에 다른 방법을 쓴다.

  * [nuxt.config.js](./ch1/front/nuxt.config.js)에서 관리한다.

    


## eslint

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



