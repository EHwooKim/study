// filter - callback 조건을 만족하는 요소들을 새로운 배열에 담아서 반환합니다.
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const filteredTwo = arr.filter(a => {
    console.log(`현재 위치의 값은 ${a}입니다.`)
    return a % 2 === 0   // 반환값이 반드시 true, false로 나와야 한다.
})
console.log(arr)  // 기존 코드에 영향 없다.

console.log(filteredTwo)  // 조건을 만족하는 새로운 배열

const filteredThree = arr.filter(a => a % 3 === 0)
console.log(filteredThree)