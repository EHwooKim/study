// 객체의 속성값만 배열로 반환
const obj = {
    movie: 'Sunny',
    music: 'Like Sugar',
    style: 'Retro',
    price: Infinity
}

const arr = Object.keys(obj)
console.log(arr)