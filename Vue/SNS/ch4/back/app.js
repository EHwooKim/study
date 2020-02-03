const express = require('express')

const app = express()

app.get('/', (req, res) => { // 'localhost:3080/' 생략된 주소 '/'
    res.send('안녕 백엔드') // res.status(200).send('안녕 백엔드') 가 원래 모양.
})

app.listen(3085, () => { // 실제 배포시 포트 숫자는 안보이잖아, http면 80, https면 443 이렇게 바꾸고 뭔가 해주면 된다.
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`)
})