const http = require('http')

const server = http.createServer((req, res) => {
    res.write('<h1>Hello, Node!</h1>')
    res.end('<p>Hello server!</p>')
})
server.listen(8080) // listen 메서드에 콜백 함수를 넣는 대신, listening 이벤트 리스너를 붙여도 된다.
server.on('listening', () => {
    console.log('8080번 포트에서 서버 대기중입니다.')
})
server.on('error', (error) => {
    console.log(error)
})
