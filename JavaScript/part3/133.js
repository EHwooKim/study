// Set을 활용한 배열 중복값 제거
const arr = ['one', 'two', 'three', 'two', 'one', 'four']
const s = new Set(arr)
console.log([...s])