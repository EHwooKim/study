const express = require('express')

const db = require('../models')

const router = express.Router()

router.get('/', async (req, res, next) => { // GET /posts?offset=10&limit=10 같이 쿼리스트링 붙여서 보통 GET요청에서 이렇게 부가적인 데이터를 보낸다.
  try {
    const posts = await db.Post.findAll({
      include: [{
        model: db.User,
        attributes: ['id', 'nickname']
      }],
      order: [['createdAt', 'DESC']],
      offset: parseInt(req.query.offset, 10) || 0, // 10개씩 가져올 떄 필요한거, offset이 10씩 높아지면서 다음거 가져올 떄 쓰고
      limit: parseInt(req.query.limit, 10) || 10  // 그런데 이렇게 offset 방법은 실무에서 안써, 게시글이 실시간으로 생성/삭제 되면서 순서가 바뀌고 성능문제 때문에. 
    })
    res.json(posts)
  } catch (err) {
    console.error(err)
    next(err)
  }
})



module.exports = router