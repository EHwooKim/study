// size - Map 객체의 요소 개수 확인 방법
const map = new Map()

map.set('one', 1) 
map.set(2, 'two') // Map 객체는 키로 다양한 자료형 사용이 가능하다.
map.set([1, 2, 3], 'Three elements')
map.set({a: 'A', b: 'B'}, 'object elements')
map.set(function() {}, 'function element')

console.log(map.size)