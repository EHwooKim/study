const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const db = require('../models')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')

const router = express.Router()  // 반드시 이렇게 써야해 대문자 조심!!

router.get('/', isLoggedIn, async (req, res, next) => { // 사용자 정보 가져오기 (백단에서는로그인 상태인데 프론트에서 로그인 풀려있어..)
  const user = req.user // 이렇게도 할 수 있지만. 여기에는 password가 들어있어, req.user를 만드는게 desirialize니까 그부분에서 좀 고치자.
  res.json(user)
})

router.post('/', isNotLoggedIn, async (req, res, next) => { // 회원가입은 로그인 안한 사람만 해야하니
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
      if (err) { ,
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
router.post('/login', isNotLoggedIn, (req, res, next) => { // 검사를 위해 LocalStrategy를 써야하는데 local.js에서뿐 아니라 여기에서도 실행을 시켜줘야겠지, passport.authenticate에 local을 적으면 LocalStrategy가 실행된다.
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
  
router.post('/logout', isLoggedIn, (req, res) => {
  if (req.isAuthenticated()) {
    req.logout()
    req.session.destroy() // 세션 없애기(선택), 왜냐하면 세션에 사용자정보말고 다른 정보도 있을 수 있기떄문에.
    return res.status(200).send('로그아웃 되었습니다.')
  }
})

module.exports = router // 라우터 모듈인 거니까 app에 연결해주는 거 잊지말자. 라우터도 미들웨어잖아 