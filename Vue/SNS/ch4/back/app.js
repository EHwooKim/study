const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt') // 비밀번호 암호화를 위한 코드
const passport = require('passport') // 설치한 passport도 불러와서 미들웨어 연결도 해줘야해
const session = require('express-session')
const cookie = require('cookie-parser')
const morgan = require('morgan')

const db = require('./models') // models 폴더의 index 파일에서 exports한 db를 불러오겠지
const passportConfig = require('./passport') // 설치한 passport와 헷갈리지않게 passportConfig로 명명
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const postsRouter = require('./routes/posts')
const app = express()

db.sequelize.sync({ force: true }) // db를 실행하는 코드. // force: true => 새로 지웠다가 만들어주는 명령어 (꼬였을 경우를 대비해 쓰긴했는데 필수는 아니라 상황에따라 쓰자)
// db.sequelize.sync({ force: true }) // 서버 실행할 때마다 db 날리고 다시 만드는 옵션
passportConfig()  // 서버 실행시 passPort도 연결


app.use(morgan('dev')) // morgan은 제일 위에, 요청이 들어오면 요청에 대한 기록을 해준다.
// 프로그래밍을 하면서 내가 모든 것을 만들기보다 남의 코드를 쓰는 경우가 많은데
// 사용방법은 공식문서 보면서 하면 되니까 외우지않아도 된다. 다만 라이브러리간에 어떻게 연결해주고 어떻게 동작하는지는 알고 쓰자!
// app.use 를 통해 req와 res를 조작할 수 있어 express middleware라 부른다, app.get, app.post들도 사실 다 middleware들이다.
app.use(cors({
  origin: 'http://localhost:3080',
  credentials: true,
})) 
app.use('/', express.static('uploads')) // 이미지와 같은 정적인 파일을 불러오기 위한 미들웨어. uploads 폴더에 있는 것들 기본주소 '/'로 불러올수 있게도 바꿔준거. '/uploads'로 적어주면 uploads 폴더안에있는 것을 uploads로 가져오기 인데, 프론트랑 백을 주소 다르게 해주는게 좋다. 왜냐하면 프론트에서 백의 폴더 구조를 알게되면 보안상의 문제가 있기떄문에!
app.use(express.json()) // express는 기본적으로 json을 body로 못받기 때문에 필요한 코드!
app.use(express.urlencoded({ extended: false })) // form을 통해서 전송할 떄 해당 데이터를 해석해서 req.body에 넣어주는 코드
app.use(cookie('cookiesecret')) // session 사용하면!? 쿠키도 사용하니 쿠키 해석을 위해 미들웨어 연걸 // cookiesecret 값은 session에 넣은것과 같게 넣어줘야한다.
app.use(session({ // 아래에서 session 사용하기 위해 연결 및 설정
  resave: false,  
  saveUninitialized: false,
  secret: 'cookiesecret', //세션쿠키가 있는데 쿠키는 암호화 할수 있고 그것을 해독할 수 있는 key값 필수
  cookie: {
    httpOnly: true,
    secure: false,
  }
})) 
//passport 미들웨어 연결 필요! 미들웨어들은 보통 요청과 응답을 조작하는데
app.use(passport.initialize()) // initialize는 요청에 로그인과 로그아웃 기능을 만들어주고
app.use(passport.session())    // session은 메모리라 그랬지, 사용자 정보를 기록할 수 있는 세션을 만들어 준다.

app.use('/user', userRouter) // user 라우터 연결
app.use('/post', postRouter)
app.use('/posts', postsRouter)

app.get('/', (req, res) => { // 'localhost:3080/' 생략된 주소 '/' 
  res.send('안녕 EHwoo') // res.status(200).send('안녕 백엔드') 가 원래 모양.
})


// app.post('/post', (req, res) => {
//   if (req.isAuthenticated()) { // 로그인 되었다면! deserializeUser에 의해 사용가능해졌다.

//   } 
// })

app.listen(3085, () => { // 실제 배포시 포트 숫자는 안보이잖아, http면 80, https면 443 이렇게 바꾸고 뭔가 해주면 된다.
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`)
})