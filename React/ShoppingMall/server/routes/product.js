const express = require('express');
const router = express.Router();
const multer = require('multer')

//=================================
//             Product
//=================================

// multer
var storage = multer.diskStorage({
  //destination: 어디에 파일이 저장되는지 - 지금은 root에 uploads 폴더에 저장
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  // filename: 파일 저장시 어떻게 이름을 저장할 것인지
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})
 
var upload = multer({ storage: storage }).single('file')

router.post('/image', (req, res) => {
  // 가져온 이미지를 저장하기.
  upload(req, res, err => {
    if (err) {
      return req.json({ success: false, err })
    }
    return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
  })
})

module.exports = router;
