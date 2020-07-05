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