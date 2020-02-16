const express = require('express')

const app = express()

// 프로그래밍을 하면서 내가 모든 것을 만들기보다 남의 코드를 쓰는 경우가 많은데
// 사용방법은 공식문서 보면서 하면 되니까 외우지않아도 된다. 다만 라이브러리간에 어떻게 연결해주고 어떻게 동작하는지는 알고 쓰자!
// app.use 를 통해 req와 res를 조작할 수 있어 express middleware라 부른다, app.get, app.post들도 사실 다 middleware들이다.
app.use(express.json()) // express는 기본적으로 json을 body로 못받기 때문에 필요한 코드!
app.use(express.urlencoded({ extended: false })) // form을 통해서 전송할 떄 해당 데이터를 해석해서 req.body에 넣어주는 코드

app.get('/', (req, res) => { // 'localhost:3080/' 생략된 주소 '/' 
    res.send('안녕 EHwoo') // res.status(200).send('안녕 백엔드') 가 원래 모양.
})

app.post('/user', (req, res) => {
    req.body.email
    req.body.password
    req.body.nickname
})

app.listen(3085, () => { // 실제 배포시 포트 숫자는 안보이잖아, http면 80, https면 443 이렇게 바꾸고 뭔가 해주면 된다.
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`)
})