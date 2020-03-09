const express = require('express')
const { isLoggedIn } = require('./middlewares')

const router = express.Router()

router.post('/images', isLoggedIn, (req, res) => { // 로그인한 사용자만 다음 미들웨어인 (req, res) => {} 로 넘어가게 되는 것.

})

router.post('/', isLoggedIn, (req, res) => { // POST '/post' 게시글 작성

})

module.exports = router