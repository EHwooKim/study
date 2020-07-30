const http = require('http')
const fs = require('fs')
const url = require('url')
const qs = require('querystring')

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .map(([k, ...vs]) => [k, vs.join('=')])
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v)
            return acc
        }, {})

const session = {}

http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie)
    if(req.url.startsWith('/login')) {
        const { query } = url.parse(req.url)
        const { name } = qs.parse(query)
        const expires = new Date()
        expires.setMinutes(expires.getMinutes() + 5)
        const randomInt = +new Date() // 쿠키에 이름을 담아서 보내는 대신 randomInt라는 임의의 숫자를 보냅니다.
        session[randomInt] = { // 사용자의 이름과 만료 시간은 session이라는 객체에 대신 저정합니다.
            name,
            expires,
        }
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `session=${randomInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
        })
        console.log(session)
        res.end()
    } else if (cookies.session && session[cookies.session].expires > new Date()) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'})
        res.end(`${session[cookies.session].name}님 안녕하세요`)
    } else {
        fs.readFile('./server4.html', (err, data) => {
            if (err) {
                throw err
            }
            res.end(data)
        })
    }
})
    .listen(8084, () => {
        console.log('8084번 포트에서 서버 대기 중입니다.')
    })

// 실제 배포용 서버에서는 세션을 위와 같이 변수에 저장하지는 않습니다. 서버가 멈추거나 재시작되면 메모리에 저장된 변수가 초기화되기 때문입니다.
// 또한 서버의 메모리가 부족하면 세션을 저장하지 못하는 문제도 생깁니다. 그래서 보통은 데이터 베이스에 넣어둡니다.
// 위 코드는 개념설명은 위한 코드일뿐, 실제로는 매우 취약한 코드입니다. 