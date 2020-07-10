# useReducer 

* 자식 컴포넌트와 부모 컴포넌트간 데이서 관리를 위해 `context API` 또는 `useReducer`를 사용한다.
* `useReducer`는 state의 개수를 줄여가는 개념이다.
* [코드 참고](./TicTacToe.jsx)
* useReducer - dispatch로 state를 바꿀 때 **비동기**적으로 바뀐다. => 그렇기 때문에 비동기 처리를 위해 `useEffect`를 사용해야한다.

