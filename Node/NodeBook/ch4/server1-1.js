// https 인증서가 있다면 다음과 같이 적용시키면 됩니다.

const https = require('https')
const fs = require('fs')

https.createServer({
    cert:fs.readFileSync('도메인 인증서 경로'),
    key:fs.readFileSync('도메인 비밀키 경로'),
    ca: [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
    ],
}, (req, res) => {
    res.write('<h1>Hello Node!</h1>')
    res.end('<p>Hello Server!</p>')
}).listen(443, () => {
    console.log('443번 포트에서 서버 대기 중입니다.')
})

// server1 코드와 비슷하지만 createServer 메서드가 인자를 두 개 받습니다.
// 두 번쨰 인자는 http 모듈과 같이 서버로직이고
// 첫 번쨰 인자는 인증서에 관련된 옵션 객체입니다.
// 인증서를 구입하면 pem이나 crt 또는 key 확장자를 가진 파일들을 제공해줍니다.
// 파일들을 fs.readFileSync 메서드로 읽어서 cert, key, ca 옵션에 알맞게 넣어주면 됩니다.