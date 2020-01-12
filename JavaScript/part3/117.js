// parse - JSON문자열을 JSON으로
const jsonStr = '{"drama":"PET","season":2017,"casting":'+'["koyuki","matsumoto jun"],"character":["sumire","momo"]}'

console.log(JSON.parse(jsonStr))
console.log(JSON.parse(jsonStr, (key, val) => {
    if (key === 'season') val = 2003
    return val
}))

console.log(JSON.parse('13.1'))         // JSON문자열이 아니지만 에러가 나지않고 13.1 이라는 문자열 반환.
console.log(typeof JSON.parse('13.1'))
console.log(JSON.parse('false'))
console.log(typeof JSON.parse('false'))

console.log(JSON.parse('Kiss Carnival')) // 에러
console.log(JSON.parse('[2003, 2017'))  // 에러