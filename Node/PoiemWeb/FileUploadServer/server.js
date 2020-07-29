// server.js
const http = require('http')
const url = require('url') 

function start(route, handle) {
  function onRequest(req, res) {
    let postData = ""
    const pathname = url.parse(req.url).pathname
    console.log(`Request for ${pathname} received.`)

    req.setEncoding("utf8")

    // req.on === req.addListener
    // "data" listner : POST 데이터의 새 청크가 도착했을 떄 실행
    req.on("data", function(postDataChunk) {
      postData += postDataChunk
      console.log(`Received POST data chunk '${postDataChunk}'.`)
    })

    // 모든 청크를 다 받았을 떄 실행
    req.on("end", function() {
      route(handle, pathname, res, postData)
    })
  }

  http.createServer(onRequest).listen(8888)
  console.log(`Server has started http://127.0.0.1:8888`)
}

exports.start = start
