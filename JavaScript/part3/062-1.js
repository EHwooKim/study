// Number.isNaN 을 이용한 안전한 계산
function verifyNumber(n) {
    if (!n || Number.isNaN(n)) return 0
    return n
}
const num1 = verifyNumber(15)
const num2 = verifyNumber(undefined)
const num3 = verifyNumber(null)
const num4 = verifyNumber(NaN)
console.log(num1 + num2 + num3 + num4)