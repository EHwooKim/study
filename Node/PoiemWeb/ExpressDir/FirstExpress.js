// Express - Route
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// { extended: true } : nested object를 지원한다.
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello world!'))

app.post('/signin', (req, res) => {
  const { username, password } = req.body
  // 클라이언트로부터 전송된 페이로드를 그대로 response 한다.
  res.send({ username, password })
})

// GET, POST 요청
app.get('/api/books', (req, res) => res.send('GET request to the /api/books'))
app.post('/api/books', (req, res) => res.send('POST request to the /api/books'))

// next() - 후속 handler로 제어 전달
app.get('/next', (req, res, next) => {
  console.log('[GET 1] next 함수에 의해 후속 핸들러에게 res가 전달된다.')
  next()
}, (req, res) => res.send('Hello from GET/'))

app.post('/next', (req, res, next) => {
  console.log('[POST 1] next 함수에 의해 후속 핸들러에게 res가 전달된다.')
  next()
}, (req, res) => res.send('Hello from POST/'))

// path에 문자열뿐아니라 정규표현식도 사용이 가능하다.
// localhost:3000/<number>
app.get(/^\/[0-9]+$/, (req, res) => res.send('regexp'));

// localhost:3000/user/<userId>/item/<itemId>
app.get('/user/:userId/item/:itemId', (req, res) => {
  console.log(req.params)
  const { userId, itemId } = req.params;
  res.send(`userId: ${userId}, itemId: ${itemId}`);
});

// route handler
const cb0 = (req, res, next) => {
  console.log('CB0')
  next()
}
const cb1 = (req, res, next) => {
  console.log('CB1')
  next()
}
const cb2 = (req, res) => {
  res.send('Hello from C!')
}
// route handler - 함수 배열의 형태
app.get('/example/c', [cb0, cb1, cb2])
// route handler - 함수 배열 & 함수의 조합
app.get('/example/d', [cb0, cb1], (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => res.send('Hello from D!'))

app.get('/myerror', (req, res) => res.sendStatus(404))





app.listen(3000, () => {
  console.log( 'First express app listening on http://127.0.0.1:3000')
})