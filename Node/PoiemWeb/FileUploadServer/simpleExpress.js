const express = require('express')
const app = express()

app.get('/', function(req, res) {
  res.send("Hello world")
})

app.listen(8888, function() {
  console.log('Example app listening on http://127.0.0.1:8888')
})