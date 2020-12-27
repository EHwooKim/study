# RxJS

## Reactive Programming

**리액티브 프로그래밍**이란 데이터 스트림과 변화의 전이를 통한 비동기 프로그래밍 패러다임

추상적인 시간개념과 데이터의 변화 자체를 프로그램내에서 가시적으로 표현할 수 있어졌다.

* 명령형 프로그래밍

  * 컴퓨터가 수행할 명령의 모음으로써 프로그래밍을 한다.
  * 컴퓨터가 어떻게 작업을 수행하는 지에 대해 설명한다.
  * ex) A라는 사람의 집에 있는 택배를 B라는 사람의 집으로 옮겨, 다했으면 계속 반복해
  * ex) 시계는 1초에 한번 1초 증가, 60초에 한번 1분 증가와 같이 컴퓨터에 내릴 명령을 하나하나 모두 작성하는 방법

* 선언형 프로그래밍

  * 프로그램이 어떤 방법으로해야 하는지를 나타내기보다 **무엇**과 같은지를 설명하는 경우를 선언형이라고 한다.

  * ex) `A라는 사람의 집에 택배가 오면 B라는 사람의 집에다 옮겨`가 아닌 `B라는 사람의 집에는 A 집에 온  택배들이 있도록 해` 

    > 와같은 방식으로 A의 집에 택배가 오는지 신경쓰지 않아도 되고, B에게 택배를 옮기라고 명령을 하지 않아도 된다. 대신 B에게 항상 A에게 온 택배가 있도록하라고 선언을 한다
    >
    > A와 B 사이의 관계만 선언을 하면 그 선언에 맞도록 나머지는 컴퓨터가 처리한다. 

* 리액티브 프로그래밍

  * 시간에 따른 데이터 스트림과 변화의 전파에 관한 선언적 프로그래밍의 일환.

  * ex) A택배 도착 알림함(데이터 스트림) => 택배 도착 알림함에 알림이 울리면 A 집에서 B 집으로 택배를 옮겨 => B 택배 도착 알림함이 울린다 => ...

    > 택배 : 데이터, A의 집에 택배가 오는 현상: 데이터 스트림

## Observable

* `Observable` 

  * `RxJS`에서 Data stream이라는 추장적인 개념을 구현한 구현체.

  * 즉, Observable을 구독하고 Observable에서 다양한 값들이 발생하면 이를 받아서 어떤 행동을 취한다.

  * 데이터의 흐름을 `구독(Subscribe)`하며 시간에 따라 나오는 데이터에 따라 우리가 어떻게 대응할지 프로그램을 작성하면 된다.

    > 이름 그대로는 관측, 관찰이지만 RxJS에서는 subscribe를 사용한다.

## Observable 생성

### From, Of

[코드](./From_Of.js)

### Interval, timer

[코드](./Interval.js)

### concat, merge

[코드](./Concat_Merge.js)

## Operators

`Observable`을 구독하기 전에  `pipe` 내부에서 전처리를 해주는 도구들. (pipel내부에서 여러번 사용 가능 )

* `tap` 

  ```javascript
  tap(next?: (x: number) => void, error?: (e: any) => void, complete?: () => void)
  ```

  데이터에 직접적인 영향을 끼치지는 않고, 들어온 데이터에 대해 사전에 특정 동작을 취할 수 있다.

  ```javascript
const stream = Rx.from([1, 2, 3, 4, 5])
  
  stream.pipe(
    tap(data => {
      console.log('tap first', data)
    }),
    tap(data => {
      console.log('tap second', data + 10)
    })
  ).subscribe(console.log)
  // tap first 1, tap second 11, 1 ... 
  ```

* `filter`, `map`, `reduce`

  > Javascript Array 메서드와 동일

  ```javascript
  stream.pipe(
    filter(data => data > 2),
    map(data => data ** 2),
    tap(console.log),
    reduce((a, c) => a + c)
  ).subscribe(console.log)
  /*
    9		(tap)
    16	(tap)
    25	(tap)
    50	(reduce, subscribe(console.log))
  */
  ```

* `concatMap`

  *  데이터의 흐름이 들어올 때 각 데이터마다 다른 Observable로 mapping을 시켜준다
  
  [코드](./ConcatMap_ConcatAll.js)
  
* `concatAll`

  데이터의 흐름 자체가 또 다른 Observable의 흐름일 때 사용한다. 

  ```javascript
  const stream1 = Rx.interval(1000).pipe(take(3))
  const stream2 = Rx.interval(1000).pipe(take(3))
  
  // Rx.of를 통해 두 Observable에 대한 Observable 생성
  const stream3 = Rx.of(stream1, stream2) 
  
  stream3.subscribe(console.log)
  /*
  # 실행 결과 - Observable들이 출력된다.
  Observable {stream3.pipe(
    concatAll()
  ).subscribe(console.log)
    _isScalar: false,
    source: Observable { _isScalar: false, _subscribe: [Function (anonymous)] },
    operator: TakeOperator { total: 3 }
  }
  Observable {
    _isScalar: false,
    source: Observable { _isScalar: false, _subscribe: [Function (anonymous)] },
    operator: TakeOperator { total: 3 }
  }
  */
  ```

  이제 위 stream3가 하나가 완료되고 다른 하나가 실행되도록 하려면 아래와 같이 사용한다

  ```javascript
  stream3.pipe(
    concatAll()
  ).subscribe(console.log)
  // 0 1 2 0 1 2
  ```

  ```javascript
  const stream1 = Rx.interval(1000).pipe(take(3), tap(console.log))
  const stream2 = Rx.interval(1000).pipe(take(3), tap(console.log))
  
  const stream3 = Rx.of(stream1, stream2)
  
  stream3.pipe(
    concatAll()
  ).subscribe()
  ```

  ```javascript
  Rx.concat(stream1, stream2).subscribe()
  ```

  >  방법은 다양하다~

* `mergeMap`

  `concatMap`과 마찬가지로 일련의 Observable과정을 수행하는데 하나의 과정의 모두 끝나고 다음 과정을 하는 `concatMap`과는 다르게 데이터가 도착하면 바로 해당 과정을 시행하기 시작한다.
  
  [코드](./MergeMap_MergeAll.js)
  
* `mergeAll`
  
  Observable들을 순차적으로 실행하는  `concatAll`과 다르게 동시에 실행한다.
  
  이때 인자로 숫자를 넘겨주면 해당 숫자의 개수만큼 묶어서 병렬처리하고, 해당 묶음의 스트림이 끝나면
  
  다음 묶음의 스트림이 실행되도록 만들 수도 있다.
  
  ```javascript
  const stream11 = Rx.interval(1000).pipe(take(3), tap(console.log))
  const stream12 = Rx.interval(1000).pipe(take(3), tap(console.log))
  const stream13 = Rx.interval(1000).pipe(take(3), tap(console.log))
  const stream14 = Rx.interval(1000).pipe(take(3), tap(console.log))
  const stream15 = Rx.interval(1000).pipe(take(3), tap(console.log))
  
  const stream16 = Rx.of(stream11, stream12, stream13, stream14, stream15)
  
  stream16.pipe(
    mergeAll(2)
  ).subscribe()
  // 00 11 22 00 11 22 0 1 2
  ```
  
  
  
  