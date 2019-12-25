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

### vue-devtools

* 크롬 웹스토어 -> `vue.js devtools` 설치 //
* **배포환경에서는 못 보게 해야 보안에 좋다!**  -> `Vue.config.devtools = false`

### dist/app.js

`webpack build`시 생겼던 dist/app.js가 `webpack dev server`를 사용하니 안생겼다.

 하지만 정상적으로 코드는 작동되는데 `webpack dev server`의 특징 때문이다.

webpack의 `output`을 파일로 만들어서 저장하는 것이 아니라 **메모리에 저장**한다.

## 05. 가위바위보

> vue 의 life cycle에 대하여

### v-bind

`v-bind` 사용시 `class`와 `style`은 객체 형태로 사용이 가능해서 다음과 같은 작성해도 된다.

```html
<div id="computer" :class="{state:true, hello:false}" :style="{backgroundImage: '', fontSize: '14px'}"></div>
```

### life-cycle

![lifeCycle](./img/lifeCycle.png)

* `created`: 컴포넌트가 보여지게 될 때 (아직 화면에 나타나기 전)
  * 컴포넌트가 만들어질 때 각 데이터들을 다 넣어진 상태. 아직 화면에는 보여지기 전
* `mounted`: 컴포넌트가 화면에 나타난 후 (화면에 나타나고 접근이 가능하기에 화면과 관련된 내용은 mounted에서 처리한다.)
  * 화면에 보여질 때. 
  * 즉, js상에서만 보이는건 `created`, 화면에 보이면 `mounted`
  * `mounted`에서 실행시키면 해당 컴포넌트가 사라져도 mounted는 계속 실행되고 있어서 메모리누수(memory leak)가 생기기 때문에 `beforeDestroy`에서 멈추게 해주면 된다. 
* `updated`: 데이터가 바뀌면서 화면이 다시 그려질 때
* `destroyed`: 컴포넌트가 화면에서 사라질 때
* `before-`: 각각의 행동들이 취해지기 전에 실행

## 06.로또추첨기

### setTimeout, setInterval, cleartInterval

* `setTimeout` : 일정시간 후 함수를 실행합니다.

  * setTimeout(fn, delay)

  ```javascript
  setTimeout(function(){console.log('setTimeout')}, 1000)
  // 1초 후 setTimeout 출력
  ```

* `setInterval` : 일정시간마다 함수를 실행합니다.

  * setInterval(fn, delay)

  ```javascript
  setInterval(function(){console.log('setInterval')}, 1000)
  // 1초마다 setInterval 출력
  ```

  * 다음과 같이 사용하면 반복없이 한번만 출력된다.

  ```javascript
  setInterval(console.log('setInterval'), 1000)
  // setInterval 한번만 출력
  ```

* 위의 두가지를 사용할 때 메모리 누수를 방지를 위해 상황에 맞게 멈춰줘야 한다.

  * `clearInterval` : setInterval로 반복하고 있는걸 멈추게 한다.
  * `clearTimeout()`: setTimeout의 실행을 멈춘다
  * 먼저 setInterval(), setTimeout()메소드를 변수에 메모리 하고 그것을 clear하는 방법으로 사용한다.

  ```javascript
  var count = 0
  var repeat = setInterval(function() {
      consoke.log('setInterval')
      count++
      if (count == 5) {
          cleartInterval(repeat)
      }
  }, 1000)
  ```


### reduce

`배열.reduce((누적값, 현재값, 인덱스, 요소) => {return 결과}, 초기값)`

>  이전값이 아니라 누적값이라는 것에 주의! 누적값이기 때문에  다양한 활용이 가능하다.

```javascript
result = oneTwoThree.reduce((acc, cur, i) => {
  console.log(acc, cur, i);
  return acc + cur;
}, 0);
// 0 1 0
// 1 2 1
// 3 3 2
result; // 6
```

* acc(누적값)이 초깃값인 0부터 시작해서 return하는대로 누적된다.
* 초깃값을 적어주지 않으면 자동으로 초깃값이 0번째 인덱스의 값이 됩니다.

`reduceRight`는  reduce와 동작은 같지만 요소 순회를 오른쪽에서부터 왼쪽으로 한다는 점이 차이입니다. 

```javascript
result = oneTwoThree.reduceRight((acc, cur, i) => {
  console.log(acc, cur, i);
  return acc + cur;
}, 0);
// 0 3 2
// 3 2 1
// 5 1 0
result; // 6
```

### watch

> watch는 해당 값이 변화를 감지하여 동작한다.

```html
  watch: { 
    bonus(value, oldValue) {
      if(value === null) {
        this.showBalls()
      }
    }
  }
```

## 07.틱택토

* `<table>` 생성시 `<tr>`, `<td> ` 를 쓰지 않고 `tr-component`, `td-component`를 따로 만드는 이유
  * table 컴포넌트 하나로 테이블을 만들 경우 한 칸을 클릭했을 때 테이블 전체가 다시 계산되기 때문에 데이터가 많아지면 성능에 문제가 생긴다.

### props, $root, $parent

* 부모컴포넌트의 데이터를 props를 통해 자식컴포넌트에게 넘겨줄 수 있다.
* td컴포넌트에서 `turn` 데이터를 사용하려면 4번에 걸쳐 props로 넘겨주는 방법도 있겠지만
* `this.$root.$data` 로 한번에 root데이터에 접근이 가능하다.
* `this.$parent.$data` 로 한번에 부모 데이터에 접근이 가능하다.

> 위의 개념을 적용하여 
>
> td 클릭시 마다 해당 칸에 turn이 표시되도록 다음과 같은 코드를 작성하였으나
>
> 데이터는 바뀌지만 화면에 표시는 안되었다.

```javascript
this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn
```

#### :lipstick: 중요! 계속 실수하게 되는 내용

* `Vue`에서 `배열`이 있고 배열 내부의 값을 `인덱스`를 통해 접근하여 바꾸면 화면에 반영이 되지 않는다! 
  * `push`와 같이 배열의 `메소드`를 사용하여 값을 바꿀 때는 화면에 반영이 된다.
  * 이것을 해결하기 위한 아래의 두가지 방법!

### :lipstick: Vue.set / this.$set

```html
<script>
  import Vue from 'vue'
  methods: {
    onChangeData() {
      //this.tableData[1][0] = 'x' : 작동하지 않음.
      Vue.set(this.tableData[1], 0, 'X')  // 이 방법은 작동. => (1, 0)에 X를 넣는다.
    }
  },    
```

*  `this.$set`을 사용하면  Vue를 불러오지 않고도 가능하다.

```html
<script>
  methods: {
    onChangeData() {
      //this.tableData[1][0] = 'x' : 작동하지 않음.
      this.$set(this.tableData[1], 0, 'X')  // 윗줄 대신 이렇게 써야한다.
    }
  },   
```

### VueX의 필요성

* 위에서 배운 `this.$root`, `this.$parent` 로 root와 parent 데이터에 접근이 가능함을 배웠다.
* 그런데 중간 단계에 있는 데이터에 접근하려 하면?
  * `this.$parent.$parent.$parent` 와 같은 코드가 나올 것이고
  * 컴포넌트의 개수가 많이 질수록 이 코드를 보고 어떤 컴포넌트를 가르키는지 알기 어려워진다.
* 그래서! 모든 데이터를 중앙통제실에서 한번에 관리할 수 있는게 바로!  `VueX`

## 08.틱택토EventBus

> 데이터를 중앙에서 통제하는 VueX와는 다르게
>
> Event를 중앙에서 통제하는 EventBus

### EventBus

* eventBus.js 파일 생성

  ```javascript
  import Vue from 'vue'
  export default new Vue()
  ```

  * 깡통(?) vue를 하나 만들어서 vue에서 기본으로 제공하는 메소드를 사용하는데 `event`만 쓸거라 eventBus


### $root, $parent

* td에서 table data에 접근할 때 this.$root.$data로 해야했지만

* tisTacToe에서 직접 eventbus를 통해 메소드를 사용하기 때문에 this.tableData로 접근이 가능하다

  ```html
  <-- ticTacToe.vue ->>
  methods: {
    onClickTd() {
  	...
    }
  }
  ...
  created() {
  	eventBus.$on('clickTd', this.onClickTd)
  }
  ```

  ```html
  <-- tdComponent.vue -->
      method() {
      	onclickTd() {
      		...
      		eventBus.$emit('clickTd', this.rowIndex, this.cellIndex)   
      		// $emit 은 $on이랑 대응된다.
      }
      }
  ```
  
  * $emit과 $on은 대응되어있다.
    * td에서 $emit('clickTd')가 호출되면 ticTacToe에서 $on에 대응되어 연결된 핸들러인 `this.onClickTd`) 가 실행된다. 
  * 이런식으로 데이터 조작을 `RootComponent`에서 다 처리할 수 있고 흩어진 component에서는 $emit으로 실행만 시키면되니 작업이 편해지겠지! ( 물론 root component의 코드 길이가 길어지겠지)
  

### eventbus의 단점

* `EventBus`는 중앙통제를 하기때문에 간단해지고 원하는 코드를 한 파일 내에서 찾을 수 있다는 장점이 있지만

  **코드가 너무 길어진다**는 단점이 있다.



## 09.틱택토 VueX
```bash
$ npm i vuex
```

### store

* `store`를 하나만 만들어야하는 `Redux`와 다르게 `Vue`는 `store`를 여러개 만들어도 된다.

  * `vue`가 `react`와 `angular`와 같은 것들의 단점들을 개선하며 만들었다보니 이런 장점들이 많다.
  
* vue가 더 쉽기도하고 뭔가 알아서 처리해주는게 많아서 좋긴 하지만 개발자가 지시하대로 딱 움직이게 하여 직관적인 코드를 짜고싶은 사람들은 react를 더 좋아하기도 한다.
  
  (하지만 이번에는 store 하나로 해결하는것만 다룬다.)


* `store.js`

  ```javascript
  import Vuex from 'vuex'
  
  export default new Vuex.Store({
    state: {
  
    },  // vue의 data 속성과 비슷
    getters: {
  
    },  // vue의 computed와 비슷
    mutations: {
    
    },  // state를 수정할 떄 사용, 동기적으로
    actions: {
  
    },  // 비동기를 사용할 때, 또는 여러 mutations을 연달아 실핼할 때
  })
  ```

  
  * state - vue에서 data에 적었던 것들을 이곳에.
  
  * mutations 
  
  
    * 대문자로 정의하는게 규칙
      * state(data)를 수정할 때, state.tableData에 바로 대입하는 것이 아니라 mutation `함수`를 이용하여 값을 바꾼다. 
      * 왜 바로 바꾸지 않고 mutation을 통해서 바꿀까?
  
          * vuex 를 사용하면 vue devtools에서 두번째 탭을 사용할 수 있는데 이곳에서 데이터를 어떻게 바꿨는지 **추적**이 가능하다
  
  * getters
  
  
    * computed처럼 state(data)에 추가적인 작업을 할 수 있다
  
      ```javascript
      getters: {
        turnMessage(state) {
          return state.turn + '님이 승리하셨습니다.'
        }
      ```
  
  
      * `computed`와 마찬가지로 
        1. 캐싱이 되고
        2. state.turn이 바뀔 때만 값이 변경되기 때문에 유용하다
  
  
    * 동적 속성
  
      ```javascript
      mutations: {
          SET_WINNER(state, winner) {
            state.winner = winner
          }    
      }
      ```
  
      위와 같이 쓰는 것을 `ES2015`문법으로 아래와 같이 변수로 뺴는 방법이 있는데 vuex에서는 보통 이렇게 쓴다.
  
      ```javascript
      export const SET_WINNER = 'SET_WINNER'
      
      mutations: {
          [SET_WINNER](state, winner) {
            state.winner = winner
          }    
      }
      ```
  
      그리고 `export`를 함께 써서 다른 파일에서도 쓸 수 있게 해주었다.
  
      **왜 이렇게 변수로 따로 뺴서 사용 할까?**
  
      * tdComponent에서 this.$store.commit('CLICK_CELL') 처럼 문자열 안에 mutation 을 넣어야 하는데 문자열같은 경우 오타내기가 쉬우며 오타나 났을 떄 찾기도 어렵다.
  
      * 하지만 export -> import { CLICK_CELL } from './store' 처럼 가져와 사용하여 
  
        this.$store.commit(CLICK_CELL)과같이 변수로 쓰면 오타도 줄어들고 오타가 나면 오류로 띄워주기에 디버깅이 쉽다. 
  

### mutation 사용하여 state(data) 변경


* `store`에서 `state`와 `mutation`를 다 정의 했으면 하위컴포넌트에서 아래와 같이 쓸 수 있다

  ```javascript
  import { SET_WINNER } from './store'
  ...
  this.$store.commit(SET_WINNER, this.turn)
  ```


  * mutation에 접근할 떄는 `commit`으로
  * 첫번쨰 인자는 mutation명, 두번쨰 인자는 데이터

### vue와 vuex,  store와 최상위 컴포넌트  연결하기


* vue와 vuex 연결 시키기


  * 오류 -`[vuex] must call Vue.use(Vuex) before creating a store instance.`
  * 오류내용 그대로 `store.js`에서 Store 선언 전에 `Vue.use(Vuex)` 를 적어주면 해결.

* store와 최상위 컴포넌트 연결 시키기

  ```javascript
  //최상위 컴포넌트
  
  <script>
      import store from './store'
  ...
  	export default {
  		store,
  		...
  }
  ```

### state


* `vuex`를 사용하게 되면서 이제 어떤 부모로부터 어떤 자식에게 어떤 데이터를 넘겨주고 올려주는지를 생각할 필요가 없어졌다!!!

* 이제 필요한 컴포넌트별로 필요한 데이터가 있다면 computed에서 바로 끌어다 쓰면 된다.

  ```javascript
  computed: {
      winner() {
          return this.$store.state.winner
      }
  }
  ```

* 그런데!!! 이 끌어다 쓰는 과정도 만약 데이터가 100개가 필요하다면 100개를 가져와야하니 귀찮잖아? 그래서 이미 개발해놓은게 있지

### mapState

* `mapState`를 이용하면 한번에 store의 `state`를 연결할 수 있다.

  ```javascript
  <script>
    import { mapState } from 'vuex'
    ...
    computed: {
      ...mapState(['winner', 'turn'])
    }
  ```

  * 위의 형태가 기본형태이고 추가적으로 변형도 가능하다 [공식문서](https://vuex.vuejs.org/kr/guide/state.html)

* `mapState`뿐 아니라 `mapGetters`등 다른 것들도 존재한다.

### Vue.use() 추가 내용

vue에서 각종 플러그인, 라이브러리를 사용할 때 `Vue.use`를 해야한다.

그런데 `main.js`가 아닌 `store.js`에서 하는 이유는 코드를 실행하면 위에서부터 차례대로 읽는데

`main.js`에서 `Vue.use`를 해버리면 `store`를 가져오기 전에 사용하게 되다보니 오류가 생긴다.

