/*
  # 초기 모듈 방식
  - 전역에 sum 함수가 등록되어 console에서 바로 sum을 호출할 수 있다.
*/

// function sum(a, b) {
//   return a + b
// }


/*
  # IIFE 방식의 모듈
  - math 모듈에 등록하는 방식으로, 전역에서 sum을 호출할 수 없다 (math.sum 으로 호출)
*/
// var math = math || {};

// (function() { // 이 즉시실행 함수의 스코프는 외부로부터 독립적이다.
//   function sum(a, b) {
//     return a + b
//   }

//   math.sum = sum // sum 함수를 math 모듈 외부에서 사용할 수 있도록 전역 math에 sum함수 등록
// })()


/*
  ES2015 표준 모듈 시스템
*/
export function sum(a, b) {
  return a + b
}