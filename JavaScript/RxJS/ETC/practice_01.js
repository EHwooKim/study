/**
  # 복잡한 택배 시스템
  - 1000개의 택배가 1초에 한번씩 배송된다.
  - 택배를 받으면 그 즉시 아래의 작업을 실행한다.
    * 상품 개봉 (3초 소요)
    * 상품 검사 (3초 소요)
    * 상품 사용 (3초 소요)
  - 이때 택배 회사에는 종업원이 3명 밖에 없기 때문에 위 작업은 최대 3명에 의해서 동시에 실행될 수 있다.
  - 즉, 동시에 4개 이상의 작업은 실행될 수 없다.

  - 각 택배들에 대해서 상품 사용까지 종료된 택배들은 10개씩 묶어서 공항으로 보낸다.
*/
const { of, interval, from } = require('rxjs')
const { take, concatMap, mergeAll, delay, concatAll, map, tap, bufferCount, reduce } = require('rxjs/operators')

const deliveries = interval(1000).pipe(take(100))

const openBox = (delivery) => {
  return of(delivery).pipe(
    delay(3000),
    tap(delivery => console.log(delivery, ' 를 얻었습니다.'))
  )
}
const checkBox = (delivery) => {
  return of(delivery).pipe(
    delay(3000),
    tap(delivery => console.log(delivery, ' 를 검사했습니다.'))
  )  
}
const useProduct = (delivery) => {
  return of(delivery).pipe(
    delay(3000),
    tap(delivery => console.log(delivery, ' 를 사용했습니다.'))
  )
}

const doTask = (delivery) => {
  const tasks = from([openBox(delivery), checkBox(delivery), useProduct(delivery)])
  return tasks.pipe(
    concatAll(),
    reduce((acc, data) => {
      return delivery // 세번의 과정마다 데이터를 방출하지 않고 reduce를 통해 한번만 방출하도록
    })
  )
}

const sendToAirPort = (data) => {
  console.log(data, '를 비행기로 보냈습니다.')
}

deliveries.pipe(
  map(delivery => doTask(delivery)),
  mergeAll(3),
  bufferCount(5), // 앞 단계에서 방출된(doTask에서 reduce를 통해 방출된 하나의 데이터) 데이터가 10개가 쌓이면 다음 pipe로 보낸다 
  tap(sendToAirPort)
).subscribe()