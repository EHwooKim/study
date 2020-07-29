// Synchronous - 동기

var fs = require('fs')
var filenames = fs.readdirSync('../')

for (let i = 0; i < filenames.length; i++) {
  console.log(filenames[i])
}
console.log('readey')
console.log('can process next job...')