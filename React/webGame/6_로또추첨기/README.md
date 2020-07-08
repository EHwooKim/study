# 목차

* [componentDidUpdate](#componentDidUpdate)
* [useMemo](#useMemo)
* [useCallback](#useCallback)
* [Hooks 팁](#Hooks-팁)

# componentDidUpdate

```javascript
  componentDidUpdate(prevProps, prevState) {
    if (this.state.winBalls.length === 0) { // 조건문
      this.runTimeouts()
    }
  }
```

* `componentDIdUpdate`는 `setState`를 할 때마다 실행이 된다.
* 그렇기 때문에 내가 원하는 조건에서만 코드가  실행되도록 조건문을 잘 작성해주는 것이 중요하다.

# useMemo

* Hooks의 특성상 Lotto 파일의 모든 코드가 재실행되는 단점이 있다.
* 그래서 지금 공을 하나씩 뽑을 때마다 getWinNumbers 함수가  실행되고있다.
* 이럴 떄 쓰이는 것이 `useMemo` (getWinNumbers의 리턴값을 Hooks가 기억하게 해준다.)

```javascript
const lottoNumbers = useMemo(() => getWinNumbers(), [])
// 두번째 인자가 바뀌기 전까지 이 함수는 다시 실행되지 않는다.
```

* **Hooks는 모든 함수가 재실행되니 잘 모르겠으면 전부 console.log를 출력하여 내가 원하는 시점에만 실행되는지 확인을 해가며 코드를 작성하자**

# useCallback

* **return 값**을 기억하는 `useMemo`와 다르게 **함수 자체를 기억한다**
  * 그러면 모든 함수에 `useCallback`을 쓰는것이 좋을까?
  * **아니다..** 기억을 너무 잘해서 `useCallback`안에서 state를 사용할 경우 맨 처음 값만 기억하고 있는 **단점이 있다**
  * 그래서 `useCallback`안에서 state를 사용하고싶으면 해당 값을 `useCallback`의 두번쨰 인자 배열안에 넣어주어야한다. (기억하지 않았으면 하는 값을 넣어준다..는 느낌..?)
* :lipstick: **자식 component에 props로 함수를 넘길 때는 `useCallback`을 반드시 적어줘야한다.**
  * 그렇지 않을 경우 매번 새로운 함수가 넘어온다고 인식하기 때문에 자식컴포넌트가 매번 재실행된다.
* 정리

| Hoks        | 역할                      |
| ----------- | ------------------------- |
| useRef      | 일반 값을 기억            |
| useMemo     | 복잡한 함수 결과값을 기억 |
| useCallback | 함수 자체를 기억          |

# Hooks 팁

* useState, useRef 등 Hooks들은 순서가 굉장히 중요하다.
* Hooks들은 조건문 안에는 **절대** 넣으면 안되고, 함수나 반복문 안에도 웬만하면 넣지 말자. 

```javascript
// 특정 조건에만 redo에 setState를 사용하고 싶어 아래와 같이 쓴다면
if (조건) {
    const [redo, setRedo] = useState(false)
}
// 
```

* 위에서부터 번호를 메긴다고 생각하고 그 순서가 항상 일정해야하는데, 조건문이 false가 나와 redo가 실행이 안되면 순서가 바뀌게 되면서 문제가 생긴다.
* 또한 `useEffect`, `useCallback`, `useMemo` 등에서도 `useState`들을 쓰면 안된다.
* componentDIdMount는 실행 안시키고 componentDIdUpdate만 실행시키고 싶다면? 아래와 같은 꼼수.. 사용

```javascript
const mounted = useRef(false)
useEffect(() => {
    if (!mounted.current) {
        mounted.current = true
    } else {
        // 이떄 원하는 ajax요청
    }
}, [바뀌는값])
```

