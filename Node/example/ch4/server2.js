// res.write 메서드로 한 줄씩 HTML코듣를 적는 것은 비효율적이기에 HTML파일을 읽어서 전송하는 방법을 써보겠다.
const http = require('http')
const fs = require('fs') // HTML  파일을 읽는 fs 모듈

http.createServer((req, res) => {
    fs.readFile('./server2.html', (err, data) => {
        if (err) {
            throw err
        }
        res.end(data) // data 변수에 저장된 버퍼를 그대로 클라이언트에 보내준다.
    })
}).listen(8081, () => {
    console.log('8081번 포트에서 대기중입니다.')
})