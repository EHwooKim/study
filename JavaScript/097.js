// find - callback 조건을 만족하는 첫번쨰 요소를 반환합니다.
const arr = [
    {name: '우림', age: 2},
    {name: '현아', age: 5},
    {name: '탄이', age: 30},
    {name: '현일', age: 3},
    {name: '혜림', age: 6}
]

const myFriend = arr.find(a => a.age === 30)
console.log(myFriend)