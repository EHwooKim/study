# 리액트 라이프사이클

[공식문서-라이프사이클](https://ko.reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class)

## 클래스 컴포넌트

* `constructor`실행(state, method 등) ->  첫 `render` -> `ref` (존재한다면) -> `componentDidMount` -> (setState/props 바뀌어 리랜더링 시)  `shouldComponentUpdate(true)` -> `render` -> `componentDidUpdate` -> (부모가 자식을 없앨 때) `componentWillUnmount` -> **소멸**



