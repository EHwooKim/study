// 반복 가능한 규약(The Iterable Protocol), 반복자 규약(The Iterator Protocol)
const items = ['j','a','v','a','s','c','r','i','p','t']
const seq = {
    [Symbol.iterator]() {
        let i = 0
        return {
            next() { // 반복자 객체 부분
                const value = items[i]
                i++
                const done = i > items.length
                return {value, done}  // 반복자 객체 부분 끝
            }
        }
    }
}

for (let s of seq) console.log(s)
const [a, b, c, ...arr] = seq
console.log('a >>> ', a)
console.log('b >>> ', b)
console.log('c >>> ', c)
console.log('arr >>> ', arr)