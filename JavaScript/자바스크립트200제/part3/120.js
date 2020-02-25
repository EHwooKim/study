// test - 정규표현식으로 특정 문자의 포함 여부 확인하기
const numRegExp = /[0-9]+/  
const phoneRegExp = /\d{3}-\d{3,4}-\d{4}$/
const emailRegExp = /^([-_.]?[0-9a-zA-Z\]{6,13})+\@([0-9a-z]+)\.([a-z]{2,3})$/i

console.log(numRegExp.test(12345))  // 몯 숫자라서 true
console.log(numRegExp.test('test')) // 숫자가 하나도 없어서 false
console.log(phoneRegExp.test('010-1234-1234'))  
console.log(phoneRegExp.test('02-1232-1233'))   
console.log(emailRegExp.test('test123@javascript.org'))
console.log(emailRegExp.test('test-javascript'))


