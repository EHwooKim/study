// Express - middleware
const express = require('express')
const app = express()

const MyLogger = (req, res, next) => {
  responseText = `Requested at: ${req.requestTime}`
  console.log(`LOGGED: ${responseText}`)
  // request - response cycle을 끝내지 않았기 때문에 next()를 꼭 호출해야한다.
  next() 
}

app.use(MyLogger) // Execute myLogger

// End the request-response cycle
app.get('/', (req, res) => res.send('Hello world!'))

app.listen(3000, () => console.log('http://localhost:3000'))