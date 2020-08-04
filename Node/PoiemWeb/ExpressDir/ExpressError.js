const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/error', (req, res, next) => {
  var error = new Error('My Error occurred')
  error.status = 500
  next(error)
})

app.use(logHandler)
app.use(errorHandler)

function logHandler(err,req, res, next) {
  console.log('logHandler')
  console.log('[' + new Date() + ']\n')
  next(err)
}

function errorHandler(err, req, res, next) {
  res.status(err.status || 500)
  res.send(err.message || 'Error!')
}

app.listen(3000, () => console.log('http://localhost:3000'))

