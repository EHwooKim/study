# 리액트 라이프사이클

## Class Component

* `constructor`실행(state, method 등) ->  첫 `render` -> `ref` (존재한다면) -> `componentDidMount` -> (setState/props 바뀌어 리랜더링 시)  `shouldComponentUpdate(true)` -> `render` -> `componentDidUpdate` -> (부모가 자식을 없앨 때) `componentWillUnmount` -> **소멸**
* [공식문서-라이프사이클](https://ko.reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class)

## Hooks Component

* Hooks 에는 라이프사이클이 없지만 흉내내는 것이 가능하다.
* `useEffect`를 활용한다 - [공식문서](https://ko.reactjs.org/docs/hooks-reference.html#useeffect)

```javascript
useEffect(() => {
  console.log('랜더링때마다 실행되겠지')
  interval.current = setInterval(changeHand, 100)
  return () => {
    console.log('종료')
    clearInterval(interval.current)
  }
}, [imgCoord])
```

* useEffect를 사용하면 `componentDIdMount`와 같은 효과
* 두번째 인자에 참조할 값을 넣으면 해당 값이 변할 때 useEffect가 다시 실행되어 `componentDIdUpdate`와 같은 효과
* return이 `componentWillUnmount`와 같은 효과
* 그래서 위 코드에서는 setInterval이 실행되고 clearInterval 또한 실행되기 때문에 결국 setTimeout과 똑같아 지지만, 두번째 인자에 imgCoord를 넣게되면 **이것이 계속 반복되면서 setInterval처럼 동작하게 된다.**

```text
class의 경우 각 라이프 사이클에서 모든 state를 조건문으로 분기처리하여 state별로 원하는 동작을 처리할 수 있고, 
Hooks의 경우 useEffect를 여러개 사용하여 state별로 원하는 동작을 처리한다.
```





# onClick 패턴 - 고차함수 활용

* [코드 확인](https://github.com/EHwooKim/study/commit/7447c71f2cf68ca524ca8e83791661daa37fc0e2)

* onClick같은 곳에 함수자체를 넣지말고 해당함수를 밖으로 뺴서 `this.something` 와 같은 것들을 넣는 것이 좋은데
* 해당 함수 안에서 또 다른 함수를 호출할 경우 고차함수를 활용한 패턴을 많이 사용한다.

