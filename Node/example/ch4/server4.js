// 쿠키가 나를 식별하는 방법에 대해 알아봅시다.
const http = require('http') 
const fs = require('fs') // HTTP 파일을 읽는다.
const url = require('url') // 주소 분석
const qs = require('querystring') // 주소에 딸려오는 query분석

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .map(([k, ...vs]) => [k, vs.join('=')])
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v)
            return acc
        }, {})

http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie)
    if(req.url.startsWith('/login')) {          // 주소가 /login으로 시작할 경우
        const { query } = url.parse(req.url)    // 주소와 query 분석
        const { name } = qs.parse(query)
        const expires = new Date()
        expires.setMinutes(expires.getMinutes() + 5) // 쿠키 만료시간을 지금으로부터 5분 뒤로 설정.
        res.writeHead(302, {    // 302 응답 코드, 리다이렉트 주소, 쿠키를 헤더에 넣어서 보낸다.
            Location: '/', 
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/` // 헤더에는 한글을 설정할 수 없으므로 name변수를 encodeURIComponent 메서드로 인코딩
        })      // 쿠키를 설정할 때 만료시간(Expires)와 HttpOnly, Path같은 옵션 부여.
        res.end()
    } else if (cookies.name) { // login 외의 경로로 접속했을 경우 쿠키가 있는지 확인
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'})  // res.end 메서드에 한글이 들어가면 인코딩 문제가 발생하므로 res.writeHead에 이 코드를 설정.
        res.end(`${cookies.name}님 안녕하세요`) // 쿠키가 있으면 인사말을 보여준다.
    } else { 
        fs.readFile('./server4.html', (err, data) => {  // login 외의 경로로 접속, 쿠키가 없으면 로그인 페이지로 이동
            if (err) {
                throw err
            }
            res.end(data)
        })
    }
})
    .listen(8083, () => {
        console.log('8083번 포트에서 서버 대기 중입니다.')
    })