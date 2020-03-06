const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt') // 비밀번호 암호화를 위한 코드
const passport = require('passport') // 설치한 passport도 불러와서 미들웨어 연결도 해줘야해
const session = require('express-session')
const cookie = require('cookie-parser')
const morgan = require('morgan')

const db = require('./models') // models 폴더의 index 파일에서 exports한 db를 불러오겠지
const passportConfig = require('./passport') // 설치한 passport와 헷갈리지않게 passportConfig로 명명

const app = express()

db.sequelize.sync() // db를 실행하는 코드.
// db.sequelize.sync({ force: true }) // 서버 실행할 때마다 db 날리고 다시 만드는 옵션
passportConfig()  // 서버 실행시 passPort도 연결


app.use(morgan('dev')) // morgan은 제일 위에, 요청이 들어오면 요청에 대한 기록을 해준다.
// 프로그래밍을 하면서 내가 모든 것을 만들기보다 남의 코드를 쓰는 경우가 많은데
// 사용방법은 공식문서 보면서 하면 되니까 외우지않아도 된다. 다만 라이브러리간에 어떻게 연결해주고 어떻게 동작하는지는 알고 쓰자!
// app.use 를 통해 req와 res를 조작할 수 있어 express middleware라 부른다, app.get, app.post들도 사실 다 middleware들이다.
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
})) 
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


app.get('/', (req, res) => { // 'localhost:3080/' 생략된 주소 '/' 
  res.send('안녕 EHwoo') // res.status(200).send('안녕 백엔드') 가 원래 모양.
})

app.post('/user', async (req, res, next) => {
  try{  // async await는 try catch감싸야하고,
    const hash = await bcrypt.hash(req.body.password, 12) // 비밀번호 암호화
    const exUser = await db.User.findOne({ // 중복 아이디 방지 
      where: { // findOne 같이 db에서 찾을 떄 조건은 where안에 적어준다.
        email: req.body.email
      }
    })
    if (exUser) { // 이미 회원가입되어이으면 에러도 성공도아닌 거절을 해야겠지 400대 코드
      return res.status(403).json({   //.send('이미회원가입되어있습니다.') 로 간단하게 보내줘도 되지만 실무에선 .json으로 자세한 데이터를 보낸다. // return 필수!
        errorCode: 1, // 위의 http 코드와 달리 이 에러코드는 맘대로 정할 수 있다.
        message: '이미 회원가입되어있습니다.', // 이 에러코드와 메세지는 맘대로 보내도 되지만 백과 프론트가 잘 맞춰야겠지,
        // res.send나 res.json을 사용하면 알아서 코드가 끝난다고 착각하는 사람들이 많은데 아니다, 반드시 return 시켜주자!
        // return 안해주면 응답이 두번가서 그 유명한 에러인 can't set headers after they are sent 가 뜨게 된다.
      })
    }
    await db.User.create({
      // where: {
        email: req.body.email, //app.user(express.json())을 했기에 쓸 수 있는 코드.
        password: hash,
        nickname: req.body.nickname,
      // }
    })
    // 회원가입 후 로그인 시키기 위해 logIn코드 복붙
    passport.authenticate('local', (err, user, info) => {  
      if (err) { 
        console.error(err)
        return next(err) 
      }
      if (info) { 
        return res.status(401).send(info.reason) 
      }
      return req.login(user, async (err) => { 
        if (err) {                            
          console.error(err)                  
          return next(err)                    
        }
        return res.json(user)
      }) 
    })(req, res, next) 

    // 요청이 들어왔으니 그에 대한 응답을 해줘야겠지. 200: 성공, 201: 성공적으로 생성됨이라는 의미이니 디테일하게 201 응답 보내면 더 좋겠지. 또는 거절하는 등 마무리 잘해줘야겠지!
    // return res.status(201).json(newUser) <= 회원가입 후 바로 로그인 하기 전에는 이 코드였다.// .send는 문자열로 응답할 때. .json은 응답 body에 json으로 응답할 때. // return 안붙여도 정상작동 하긴하는데 정확하게 하기위해서 응답에는 return붙였다
  } catch (err) {
    console.log(err)
    return next(err) // next에 관한거 좀 더 알아보자.  // return 안붙여도 정상작동 하긴하는데 정확하게 하기위해서 응답에는 return붙였다
  }
})


/* 
  # 로그인
    1. db에서 email, password 검사를 하고 - 이 검사가 바로 local.js(LocalStrategy에서 이루어진다.)
    2. 일치한다면 세션에 쿠키랑(쿠키를 key로 삼아서) 객체(정보) 저장
    3. 프론트에 쿠키 내려보내주기  
*/
app.post('/user/login', (req, res, next) => { // 검사를 위해 LocalStrategy를 써야하는데 local.js에서뿐 아니라 여기에서도 실행을 시켜줘야겠지, passport.authenticate에 local을 적으면 LocalStrategy가 실행된다.
  passport.authenticate('local', (err, user, info) => {  // 매개변수 err, user, info는 뭘까? LocalStrategy를 실행히야 결과로 done(에러, 성공, 실패)가 올건데 그것과 딱 들어맞지
    if (err) { // 에러가 있으면
      console.error(err)// 에러 출력해주고
      return next(err) // 에러처리하도록 넘겨준다
    }
    if (info) { // info는 실패에 대한 이유가 객체로 들어있지
      return res.status(401).send(info.reason) // 서버에서 거절.
    }
    return req.login(user, async (err) => { // 성공시에는 req.login에 user정보 넣어준다. req.login은 원래 있던게 아니라! 저 위에 passport.initialize()가 만들어준거야, 세션에 사용자 정보(db에서 가져온 유저정보인 exUser)를 넣는다. 
      if (err) {                            // 그런데 세션에 어떻게 저장하느냐! 는 이때 이제 passport/index.js 에 있는 serializeUser가 필요하다.
        console.error(err)                  // 사용자 정보 세션에 까지 저장되면 마지막으로 프론트에 쿠키 내려보내줘야지 (프론트 쿠키 역시 req.login이 알아서 내려보내준다.)
        return next(err)                    // 그 쿠키 이름이 connect.sid
      }                                     // 쿠키를 header에 내려보내주면서 body에 추가적인 정보를 보낼 수 있는데 그게 아랫줄 코드
      return res.json(user) // 그러고 프론트로 사용자정보 넘겨주기 (body에 정보담기)
    }) 
  })(req, res, next) 
})

app.post('/post', (req, res) => {
  if (req.isAuthenticated()) { // 로그인 되었다면! deserializeUser에 의해 사용가능해졌다.

  } 
})

app.listen(3085, () => { // 실제 배포시 포트 숫자는 안보이잖아, http면 80, https면 443 이렇게 바꾸고 뭔가 해주면 된다.
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`)
})