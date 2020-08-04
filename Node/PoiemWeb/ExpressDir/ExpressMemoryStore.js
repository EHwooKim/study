const express = require('express')
const session = require('express-session')

const app = express()

app.use(session({
  secret: 'ehwoo0707', // 일정길이 랜덤 문자열이 좋다
  resave: false,
  saveUninitialized: true,
}))

app.get('/', (req, res) => {s
  res.send('Hello, world')
})

app.get('/memory-store-counter', (req, res) => {
  var session = req.session
  if (session && session.count) {
    session.count++
  } else {
    session.count = 1
  }
  res.send('count is' + session.count)
})

app.get('/session-destroy', (req, res) => {
  req.session.destroy()
  res.send('Session Destroyed!')
})

app.listen(3000, () => console.log(`http://localhost:3000`))
