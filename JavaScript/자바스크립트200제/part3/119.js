// match - 문자열에서 정규식과 매치되는 부분을 검색하여 반환한다.
const str = 'To lose your path is the way to find that path'

const sensitiveCaseRegex = /to/
const ignoreAllCaseRegex = /to/gi
const findRangeRegex = /([a-f])\w+/i
const findAllRangeRegex = /([a-f])\w+/gi

console.log(str.match(sensitiveCaseRegex))
console.log(str.match(ignoreAllCaseRegex))
console.log(str.match(findRangeRegex))
console.log(str.match(findAllRangeRegex))
