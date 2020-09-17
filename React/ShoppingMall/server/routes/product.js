const express = require('express');
const router = express.Router();
const multer = require('multer')
const { Product } = require('../models/Product')
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

router.post('/', (req, res) => {
  // 받아온 정보들을 DB에 넣어준다.
  const product = new Product(req.body)

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err})
    return res.status(200).json({ success: true })
  })
})

router.post('/products', (req, res) => {
  // product collection에 들어있는 모든 상품 정보를 가져오기
  let limit = req.body.limit ? parseInt(req.body.limit) : 10
  let skip = req.body.skip ? parseInt(req.body.skip) : 0
  let term = req.body.searchTerm

  // filter
  let findArgs = {}
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {

      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        }
      } else {
        findArgs[key] = req.body.filters[key]
      }
    }
  }

  if (term) {
    Product.find(findArgs)
    .find({ $text: { $search: term } })
    .populate('writer')
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err })
      return res.status(200).json({
        success: true, 
        productInfo, 
        postSize: productInfo.length
      })
    })
  } else {
    // find() : 모든 정보 검색 인자로 조건을 넣을 수도 있다.
    // populate : writer에 현재 id만 들어있는데 writer의 모든 정보를 가져오기 위해 사용
    Product.find(findArgs)
    .populate('writer')
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err })
      return res.status(200).json({
        success: true, 
        productInfo, 
        postSize: productInfo.length
      })
    })
  }
})

router.get('/products_by_id', (req, res) => {
  let type = req.query.type
  let productId = req.query.id

  Product.find({ _id: productId })
    .populate('writer')
    .exec((err, product) => {
      if (err) return res.status(400).send(err)
      return res.status(200).send({ success: true, product })
    })
})

module.exports = router;
