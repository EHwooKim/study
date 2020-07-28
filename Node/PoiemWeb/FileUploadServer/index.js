// index.js
const server = require('./server')
const router = require('./router')
const requestHandlers = require('./requestHandler')

var handle = {}
handle["/"] = requestHandlers.start
handle["/start"] = requestHandlers.start
handle["/upload"] = requestHandlers.upload

server.start(router.route, handle)
