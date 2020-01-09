// some - 배열 요소가 콜백함수의 조건을 만족하는지 확인
const arr = [
    {id: 0, name: '혜림', age: 6},
    {id: 1, name: '현일', age: 3},
    {id: 2, name: '현아', age: 5},
    {id: 3, name: '우림', age: 2}
]

console.log(arr.some(el => el.name === '현아'))
console.log(arr.some(el => el.age > 6))