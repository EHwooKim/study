const range = l => {
    let i = -1
    let res = []
    while (++i < l) {
        res.push(i)
    }
    return res
}

const L = {}
L.range = function *(l) {
    let i = -1
    while (++i < l) yield i
}
const take = curry((l, iter) => {
    const res = []
    for (const a of iter) {
        res.push(a)
        if (res.length == l) return res
    }
    return res
})

L.map = curry(function *(f, iter) {
    for (const a of iter) yield f(a)
})

L.filter = curry(function *(f, iter) {
    for (const a of iter) if (f(a)) yield a
})