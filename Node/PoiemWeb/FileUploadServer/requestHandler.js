// requestHandlers.js
function start() {
  console.log("Request handler 'start' was called.")
  return "Hello world - Start"
}

function upload() {
  console.log("Request handler 'upload' was called.")
  return "Hello world - Upload"
}

exports.start = start
exports.upload = upload