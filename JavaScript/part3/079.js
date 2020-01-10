// from - 문자열 분할
const str = '12345678'
const arr = [1, 2, 3, 4, 5]
const distributedStr = Array.from(str)
const distributedArr = Array.from(arr)
console.log(distributedStr)
console.log(distributedArr)

console.log(Array.from(str, e => e * 2))
console.log(Array.from(arr, e => e**2))