const express = require('express')
const mysql = require('mysql')
const dbconfig = require('../config/database.js')
const connection = mysql.createConnection(dbconfig)
const router = express.Router()


router.get('/', (req, res) => {
  connection.query('SELECT * FROM todos', (error, rows) => {
    if (error) throw error;
    console.log('SELECT All Todos', rows)
    res.send(rows)
  })
})


module.exports = router