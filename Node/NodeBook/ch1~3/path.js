const path = require('path')

const string = __filename

console.log('path.sep:', path.sep)
console.log('path.delimiter:', path.delimiter)
console.log('------')
console.log('path.dirname()', path.dirname(string))
console.log('path.extname()', path.extname(string))
console.log('path.basename()', path.basename(string))
console.log('path.basename()', path.basename(string, path.extname(string)))
console.log('------')
console.log('path.pars()', path.parse(string))
console.log('path.format()', path.format({
    dir:'C:\\users\\ehwoo',
    name: 'path',
    ext: '.js'
}))
console.log('path.narmalize():', path.normalize('C://users\\\\ehwoo\\\path.js'))
console.log('---')
console.log('path.isAbsolute():', path.isAbsolute('C:\\'))
console.log('path.isAbsolute():', path.isAbsolute('./home'))
console.log('----')
console.log('path.relative():', path.relative('C:\\uesrs\\ehwoo\\path.js', 'C:\\'))
console.log('path.join():', path.join(__dirname, '..', '..', '/users', '.', '/ehwoo'))
console.log('path.resolve():', path.resolve(__dirname, '..', '/users', '.', '/ehwoo'))