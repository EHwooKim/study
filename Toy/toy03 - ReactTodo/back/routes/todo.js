const express = require('express')
const router = express.Router()
const { Todo } = require('../models')

/*
  get / : 전체 조회
  post / : todo 등록
  delete / : toto 삭제
  put / : todo 수정

  휴지통 기능
  휴지통 테이블을 따로 만들어야 하나.. db 컬럼만 추가해서 그거로 판단해야하나..
*/

// Todo 전체 조회
router.get('/', (req, res, next) => {
  console.log('조회!')
  Todo.findAll({})
    .then(data => res.send(data))
    .catch((err) => {
      console.error(err)
      next(err)
    })
})
// Toto 등록 - 등록하고나서 후처리를 어떻게 하는게 맞을지..
router.post('/', (req, res, next) => {
  const { todo } = req.body
  Todo.create({
    todo: todo
  })
    .then(result => res.send(result))
    .catch(err => {
      console.error(err)
      next(err)
    })
})
// Todo 삭제
router.delete('/', (req, res, next) => {
  console.log('asd',req.body)
  const TodoId = req.body.id
  console.log(TodoId)
  Todo.destroy({
    where: {
      id: TodoId
    }
  })
    .then(result => {
      res.status(200).end()
    })
    .catch(err => {
      console.error(err)
      next(err)
    })
})


module.exports = router