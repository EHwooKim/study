const http = require('http')
const fs = require('fs')

const users = {}

http.createServer((req, res) => {
    if (req.method === 'GET') {
        if(req.url === '/') {
            return fs.readFile('./restFront.html', (err, data) => {
                if (err) {
                    throw err
                }
                res.end(data)
            })
        } else if (req.url === '/about') {
            return fs.readFile('./about.html', (err, data) => {
                if (err) {
                    throw err
                }
                res.end(data)
            })
        } else if (req.url === '/users') {
            return res.end(JSON.stringify(users))
        }
        return fs.readFile(`.${req.url}`, (err, data) => {
            if (err) {
                res.writeHead(404, 'NOT FOUND')
                return res.end('NOT FOUND')
            }
            return res.end(data)
        })
    } else if ( req.method === 'POST' ) { // POST와 PUT 메서드는 클라이엍느로부터 데이터를 받으므로 특별한 처리가 필요합니다.
        if (req.url === '/users') {       // req.on('data', 콜백), req.on('end', 콜백)이 바로 그 부분, readStream으로 요청과 같이 들어오는 요청 본문을 받을 수 있습니다.
            let body = ''                 // 단, 문자열이므로 JSON으로 만드는 JSON.parse 과정이 한 번 필요합니다.
            req.on('data', (data) => {  
                body += data
            })
            return req.on('end', () => {
                console.log('POST 본문(BODY): ', body)
                const { name } = JSON.parse(body)
                const id = Date.now()
                users[id] = name
                res.writeHead(201)
                res.end('등록 성공')
            })
        }
    } else if (req.method === 'PUT') {
        if (req.url.startsWith('/users/')) {
            const key = req.url.split('/')[2]
            let body = ''
            req.on('data', (data) => {
                body += data
            })
            return req.on('end', () => {
                console.log('PUT 본문(body): ', body)
                users[key] = JSON.parse(body).name
                return res.end(JSON.stringify(users))
            })
        }
    } else if (req.method === 'DELETE') {
        if (req.url.startsWith('/users/')) {
            const key = req.url.split('/')[2]
            delete users[key]
            return res.end(JSON.stringify(users))
        }
    }
    res.writeHead(404, 'NOT FOUND')
    return res.end('NOT FOUND')
})
    .listen(8085, () => {
        console.log('8085번 포트에서 서버 대기 중입니다.')
    })