const express = require('express')
const mysql = require('mysql')
const dbconfig = require('../config/database.js')
const connection = mysql.createConnection(dbconfig)
const router = express.Router()

/*
  get / : 전체 조회
  post / : todo 등록
  delete / : toto 삭제
  put / : todo 수정

  휴지통 기능
  휴지통 테이블을 따로 만들어야 하나.. db 컬럼만 추가해서 그거로 판단해야하나..
*/


// Todo 전체 조회
router.get('/', (req, res) => {
  connection.query('SELECT * FROM todos', (error, rows) => {
    if (error) throw error;
    res.send(rows)
  })
})

// Toto 등록 - 등록하고나서 후처리를 어떻게 하는게 맞을지..
router.post('/', (req, res) => {
  const value = req.body.value
  connection.query(`INSERT INTO todos (value) VALUES ('${value}')`, (error, rows) => {
    if (error) throw error
    connection.query(`SELECT * FROM todos WHERE id=${rows.insertId}`, (error, rows) => {
      if (error) throw error
      res.send(rows)
    })
  })
})




module.exports = router