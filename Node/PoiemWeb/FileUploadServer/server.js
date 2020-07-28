// server.js
const http = require('http')

const onRequest = (req, res) => {
  console.log('Request received!')
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.write("Hello World")
  res.end()
}

const start = () => {
  http.createServer(onRequest).listen(8888)
  console.log(`Server has started http://127.0.0.1:8888`)
}

exports.start = start