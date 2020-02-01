## 네이게이션 가드

### 전역가드와  라우트 메타필드

*  `router.beforeEach`를 사용하여 전역가드를 등록할 수 있습니다.

  * `next()` 함수를 호출하지 않으면 작동하지 않으므로 주의해야합니다.

* 라우트를 정의할 떄 `meta` 필드를 포함 시킬 수 있습니다.

  * `$route.matched`를 탐색하여 메타필드를 검사할 수 있습니다.

* 위의 두가지를 이용하여 로그인 상태에 따른 라우트 접근을 관리할 수 있습니다.

  ```javascript
  const router = new Router ({
    routes = [
      {
        path: '/',
        component: HomePage
  	},
      {
        path: '/profile',
        component: HomePage
        meta: {
          needAuth: true,
          }
  	},
    ]
  })
  function isAuthenticated((to, from, next) => {
    is (store.state.auth) {
      next() // 로그인 되어있으면 해당 페이지 접근 가능.
    } else {
      next('/') // 로그인 되어있지 않으면 돌려보냅니다.
    }
  })
  router.beforeEach((to, from, next) => {
    if (to.matched.some(m => m.meta.needAuth)) { // to.matched를 통해 메타필드 탐색
      isAuthenticated(to, from, next)  // 로그인 필요한 페이지이면 함수 실행
    } elst {
      next()  // 로그인 필요없는 페이지이면 페이지 이동.
    }
  })
  ```

  

```javascript
const router = new VueRouter({...})

router.beforeEach((to, from, next) => {
  
})
```





## 스크롤 동작


* vue-router 인스턴스를 생성할 떄 scrollBehavior 함수를 정의하여 스크롤을 동작시킬 수 있다.

  ```javascript
  const router = new VueRouter({
    routes: [...],
    scrollBehavior(to, from, savedPosition) {
      //원하는 위치로 돌아가기    
    }
  })
  ```

  * `to`, `from` 라우트 객체와 `savedPosition` 인자를 받는데 savedPosition은 브라우저의 앞으로/뒤로 버튼으로 트리거되는 `popstate` 네비게이션 경우에만 사용할 수 있다.

  * 이 함수는 스크롤 위치 객체를 반환 할 수 있으며 다음과 같은 형태일 수 있다.

    * `{x: number, y: number}`
    * `{selector: string, offset? : {x:number, y:number}}`

  * `scrollBehavior` 함수가 `Promise`를 리턴할 수도 있어서 스크롤 되기 원하는 위치를 resolve 함수의 인자값으로 전달하면됩니다.

    ```javascript
    const scrollBehavior = function (to, from, savedPosition) {
      if(savedPosition) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(savedPosition)
          }, 500)
        })
      } else {
        return {x:0, y:0}
      }
    }
    ```

    

  

