const http = require('http')

const parseCookies = (cookie = '') =>  // 쿠키는 name=ehwoo;year=2020 같은 문자열 형식으로 오기 때문에 이를 {name:ehwoo, year:2020} 같은 객체로 바꾸는 함수.
  cookie 
    .split(';')
    .map(v => v.split('='))
    .map(([k, ...vs]) => [k, vs.join('=')])
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v)
      return acc
    }, {})

http.createServer((req, res) => {
  const cookies = parseCookies(req.headers.cookie) // 쿠키는 req.headers.cookie에 들어있습니다. 
  console.log(req.url, cookies)
  res.writeHead(200, { 'Set-Cookie': 'mycookie=test' }) // 응답의 헤더에 쿠키를 기록 첫 번째 인자로 200이라는 상태 코드 두 번쨰 인자로는 헤더의 내용. Set-Cookie는 브라우저한테 다음과 같은 값의 쿠키를 저장하라는 의미.
  res.end('Hello, Cookie')
})
  .listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다.')
  })

// 이렇게 쿠키를 심어서 보내는 것까지는 했고 이제 이 쿠키가 나인지를 식별하는 방법에 대해 알아봅시다 -> server4