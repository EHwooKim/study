// server.js
const http = require('http')
const url = require('url') 

function start(route) {
  function onRequest(req, res) {
    const pathname = url.parse(req.url).pathname
    console.log(`Request for ${pathname} received.`)

    route(pathname)
  
    res.writeHead(200, { "Content-type": "text/palin" })
    res.write('Hello world')
    res.end()
  }

  http.createServer(onRequest).listen(8888)
  console.log(`Server has started http://127.0.0.1:8888`)
}


exports.start = start