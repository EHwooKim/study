// 조건문 ? 표현문1(true) : 표현문2(false)

var condition = 5 > 10
condition ? console.log('left') : console.log('right')
var result = condition ? (
    console.log('삼항 연산식의 첫 번쨰 표현식 입니다.'),
    "표현식1"
) : (
    console.log('삼항 연산식의 두 번쨰 표현식입니다.'),
    "표현식2"
)
console.log(result)
