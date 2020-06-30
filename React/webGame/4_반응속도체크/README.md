# useState vs useRef

> Hooks로 컴포넌트 작성시 사용되는 useState, useRef

* useRef는 DOM 접근시 사용 가능하고 사용시`current`를 붙여줘야한다.
* useState는 set을 통해 값이 변경되면 하단 return부분이 실행된다. (**랜더링O**)
* useRef는 값이 변경되어도 하단 return부분이 실행되지 않는다.(**랜더링 X**)

