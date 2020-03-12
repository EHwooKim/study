const express = require('express')
const multer = require('multer') // 사진 저장.
const path = require('path') // node에서제공하는 모듈 (따로 설치 필요없다.)

const { isLoggedIn } = require('./middlewares')

const router = express.Router()

const upload = multer({ // multer require한게 함수라 함수 실행하면서 그 안에 option 객체를 넣는다.
  // 나중에 fs 로 S3나 구글 클라우드 이런거 쓰면 바뀌게될 코드
  storage: multer.diskStorage({// 이미지 어떻게 저장할것이냐, fs사용전까지는 백서버에 데이터 저장. uploads라는 폴더 꼭 생성해주기.
    destination(req, file, done) { // 어디에 저장할 것인지
      done(null, 'uploads') // passport와 구조가 똑같이 (에러, 성공)
    },
    filename(req, file, done) { // file 이름을 어찌할것이냐.
      // 다른 사람들이 같은 이름으로 이미지 업로시 덮어씌워지니 이런거 고려해야지. 그래서 업로드 시간 붙여주는게 가장 편하다.
      const ext = path.extname(file.originalname) // file의 originalname(이름)에서 extname(확장자) 가져오기.
      const basename = path.basename(file.originalname, ext) // ehwoo.png 이면 basename = ehwoo, ext = .png. 이제 이 둘 사이에 시간초를 넣으면 되겠지
      done(null, base + Date.now() + ext) 
    },
  }),
  limit: { fileSize: 20 * 1024 * 1024 }, // 20MB로 파일 사이즈 제한, 바이트 단위라 메가파이트*키로바이트*메가바이트
})

// upload.array(키값): 키값은 아까 formdata에서 image였지. 이렇게하면 FormData의 복잡했던 그것을 알아서 해석해준다.
router.post('/images', isLoggedIn, upload.array('image'), (req, res) => { // 로그인한 사용자만 다음 미들웨어인 (req, res) => {} 로 넘어가게 되는 것.
  // 대충 이렇게 저장되는데 req.files = [{ filename:'웃는얼굴20200202.png' }, { filename:'메가폰20200202.png' }] 여기에서 파일 이름만 뺴서 프론트로 보낸다.
  console.log(req.files)
  res.json(req.files.map(v => v.filename)) 
})

router.post('/', isLoggedIn, (req, res) => { // POST '/post' 게시글 작성

})

module.exports = router