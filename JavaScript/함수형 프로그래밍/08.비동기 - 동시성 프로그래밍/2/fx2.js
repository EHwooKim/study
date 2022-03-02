const C = {}

function noop_() {}
const catchNoop_ = arr => 
  (arr.forEach(a => a instanceof Promise ? a.catch(noop_) : a), arr)

C.reduce = curry((f, acc, iter) => {
  const iter2 = catchNoop_(iter ? [...iter] : [...acc])
  return iter ?
    reduce(f, acc, iter2) :
    reduce(f, iter2)
})

C.take = curry((l, iter) => take(l, catchNoop_([...iter])))

C.takeAll = C.take(Infinity)

C.map = curry(pipe(L.map,  C.takeAll))

C.filter = curry(pipe(L.filter,  C.takeAll))

const delay1000 = a => new Promise(resolve => {
  console.log('hi-', a)
  setTimeout(() => resolve(a), 1000)
})