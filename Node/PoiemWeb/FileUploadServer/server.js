// server.js
const http = require('http')
const url = require('url') 

function start(route, handle) {
  function onRequest(req, res) {
    const pathname = url.parse(req.url).pathname
    console.log(`Request for ${pathname} received.`)
    
    // 기존 route(handle, pathname) 형태였지만, 이제 res 객체도 같이 넘겨준다.
    route(handle, pathname, res)
  }

  http.createServer(onRequest).listen(8888)
  console.log(`Server has started http://127.0.0.1:8888`)
}

exports.start = start
