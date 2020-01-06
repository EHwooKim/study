import * as add from './add.js'
import './sideeffect.js'
import Hello from '../057/hello.js'

console.log(add.version)
const added = add.default(1, 2)
console.log(added)

hello('harin')