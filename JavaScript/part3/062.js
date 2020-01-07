// NaN 확인하기
console.log(Number.isNaN(NaN)) // true
console.log(Number.isNaN(undefined)) // false
console.log(Number.isNaN('Is is Number?')) // false
console.log(Number.isNaN(0)) // false
console.log(Number.isNaN(null)) // false

console.log(Number.isNaN(-1))
console.log(Number.isNaN(0/0))
console.log(Number.isNaN(new Date()))
console.log(Number.isNaN(new Date().toString()))
console.log(Number.isNaN('Infinity'))

console.log(new Date())
console.log(new Date().toString())