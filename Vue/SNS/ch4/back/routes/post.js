const express = require('express')
const multer = require('multer') // 사진 저장.
const path = require('path') // node에서제공하는 모듈 (따로 설치 필요없다.)

const db = require('../models')
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
      done(null, basename + Date.now() + ext) 
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

router.post('/', isLoggedIn, async (req, res) => { // POST '/post' 게시글 작성
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g)
    const newPost = await db.Post.create({
      content: req.body.content, // 이 안에 hashTag들이 들어있다.
      UserId: req.user.id, //desirialize의 결과값이지.
    })
    if (hashtags) {
      // 해쉬태그 여러개가 있으면 각각을 db에서 찾서 없으면 등록하고 그 결과값이 promise의 배열로 나온다 그것을 Promise.all해서 모두 실행하고
      const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({ // db에 있으면 찾고(저장안하고), 없으면 등록하라.
        where: { name: tag.slice(1).toLowerCase() }, // # 떼고 소문자로 저장
      })))
      await newPost.addHashtags(result.map(r => r[0])) 
      /* 
        result에서 해시태그 이름을 r[0]에서 찾고 newPost에 addHashtags해주는건데 addHashtags는 sequelize가 만들어준다.
        model에서 belongsToMany등으로 관계를 설정하면 알아서 만들어주는 메서드이다. 
        그렇다고 이 자동으로 만들어진 메서드를 남용하면.. 나중에 db명령어 복잡해졌을 떄 안될때가 있어서..
        db.sequelize.query('SELECT * FROM') 같이 쓸수있는데 이렇게 직접 쿼리를 날려주는 것도 방법이다.
      */
    }
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [{ // 이게 또 sequelize의 좋은점인데, model간 관계가 있는데 이런 관계의 정보를 자동으로 포함해준다.
        model: db.User, // 사용자가 게시글을 작성하는 관계잖아, 그것을 이렇게만 적어줘도 이 게시글 작성한 사람 정보를 가져오라는 거구나로 해석하고 가져온다. 
        attributes: ['id', 'nickname'] // 그런데 모든 정보를 다 가져오기 때문에 필요한 정보만 가져오게.
      }],
    })
    return res.json(fullPost) // newPost에는 글의 내용과 user.id만 들어있기에 user.id만으로는 그게 누군지 프론트에서 알수가없다. 그래서 유저 정보도 같이 보내야한다.
  } catch (err) {
    console.error(err)
    next(err)
  }
})

// 댓글 가져오기 - 이건 위에 Get post에서 include에 댓글까지 포함시켜 불러와도 된다. 하나의 게시글에 댓글이 엄-청 많이 달리면, 사람들은 게시글만 보고 넘어가려했는데도 그 많은 댓글을 다 가져와서 비효율적이니 따로 뺴주는게 좋다.
router.get('/:id/comments', async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: {id: req.params.id }})
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.')
    }
    const comments = await db.Comment.findAll({
      where: {
        PostId: req.params.id,
      },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname']
      }],
      order: [['createdAt', 'ASC']], // !!!! 왜 2차원 배열이지..? 1차원 배열로 하는 실수를 많이 하는데, 정렬 기준이 여러개일 경우 조건을 여러개 적어야 하거든. 조건 한개라고 1차원 배열이라고 생각하지 말자
    })
    res.json(comments)
  } catch (err) {
    console.error(err)
    next(err)
  }
}) 

// 댓글 작성
router.post('/:id/comment', isLoggedIn, async (req, res, next) => { // POST /post/:id/comment
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id }}) // params는 req.params.id로 접근 가능
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.') // 에러처리 잘해야합니다!!! 에러나면 서버 바로 죽어요
    }
    const newComment = await db.Comment.create({
      PostId: post.id, // 이부분을 아래의 addComments가 해주는거야, 그런데 addComments 방법은 쿼리를 두번 날리는거라 대규모 서비스에는 적합하지 않아, addComments를 지우고 이 코드를 살리는 것도 좋은 방법
      UserId: req.user.id,
      content: req.body.content,
    })
    // await post.addComments(newComment.id) 
    const comment = await db.Comment.findOne({  // 등록한 댓글을 이제 프론트로 보내줘야지
      where: {
        id: newComment.id
      },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
      }]
    })
    return res.json(comment)
  } catch (err) {
    console.error(err)
    next(err)
  }

})

module.exports = router