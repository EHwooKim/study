// NUmber.IsInteger() 를 이용한 안전한 계산
function verifyInteger(n) {
    if (!Number.isInteger(n)) return 0
    return n
}
const num1 = verifyInteger(15)
const num2 = verifyInteger(Infinity)
const num3 = verifyInteger(0.05)
console.log(num1 + num2 + num3)
