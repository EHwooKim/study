// FormidableTest.js
const formidable = require('formidable')
const http = require('http')
const util = require('util')

http.createServer(function(req, res) {
  if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
    // parse a file upload
    // 새 IncomingForm 생성 (submit된 form의 추상화 객체)
    var form = new formidable.IncomingForm()

    form.parse(req, function(ree, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'})
      res.write('received upload: \n\n')
      res.end(util.inspect({fields, files}))
    })
    return
  }

  res.writeHead(200, {'content-type': 'text/html'})
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>' 
  )
}).listen(8888)

console.log('http://127.0.0.1:8888')