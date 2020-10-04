/*
  # 초기 모듈 방식
*/

// console.log(sum(1, 2))


/*
  # IIFE 방식의 모듈
*/

// console.log(math.sum(1, 2))


/*
  ES2015 표준 모듈 시스템
*/
import { sum } from './math.js'

console.log(sum(1, 2))