var arr = [1, 2, 30, 44, 5]

var [b, c, ...rest] = arr
console.log(`0) b >>> ${b}`)
console.log(`0) d >>> ${c}`)
console.log(`0) rest >>> ${rest}`)

var [a=10, f=9] = [1]
console.log(`1) a >>> ${a}`)
console.log(`1) f >>> ${f}`)

var [a, f] = [f, a]
console.log(`2) a >>> ${a}`)
console.log(`2) f >>> ${f}`)

function gerArr() {
    return [1, 2, 3, 4, 5, 6]
}
[a, , , , , f] = gerArr()
console.log(`3) a >>> ${a}`)
console.log(`3) f >>> ${f}`)
