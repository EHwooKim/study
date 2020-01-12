// exec - 정규표현식과 일치하는 문자열을 반환 match와 차이점은?
const str = 'Java is not Javascript'

const result1 = /java/ig.exec(str)
console.log(result1)
console.log(result1[0])
console.log(result1.index)
console.log(result1.input)

const nums = `"1", "2", "3"`
const regex = /\d+/g

while (result2 = regex.exec(nums)) {
    console.log(result2, regex.lastIndex)
}