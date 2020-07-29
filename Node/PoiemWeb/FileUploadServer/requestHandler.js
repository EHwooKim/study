// requestHandlers.js

function start(res, postData) {
  console.log("Request handler 'start' was called.")

  const body = `
    <html lang="ko">
    <head>
    <meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
    <title>POST request</title>
    </head>
    <body>
    <form action="/upload" method="post">
    <textarea name="text" cols="60" rows="20"></textarea>
    <input type="submit" value="Submit text">
    </form>
    </body>
    </html>
  `
  res.writeHead(200, { "Content-Type": "text/html" })
  res.write(body)
  res.end()
}

function upload(res, postData) {
  console.log("Request handler 'upload' was called.")
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.write(`You've sent: ${postData}`)
  res.end()
}

exports.start = start
exports.upload = upload