// Asynchronous - 비동기

var fs = require('fs')

fs.readdir('../', function (err, filenames) {
  for (let i =  0; i < filenames.length; i++) {
    console.log(filenames[i])
  }
  console.log('ready')
})

console.log('can process next job...')