// 세션에 사용자 정보를 어떻게 저장하느냐!
const passport = require('passport')
const local = require('./local')  // 이걸 안해줘서 local이 정의되지않았다 오류떴었다.
const db = require('../models')

module.exports = () => { // 함수를 모듈로 만드는 이유는 나중에 불러올 떄 재사용이 편하도록!
  // req.login 실행시 딱 한번 실행되는 passport.serializeUser.
  passport.serializeUser((user, done) => { // 이용자 수가 굉장히 많아진다면 사용자 정보를 서버에 다 저장하는 것만으로도 메모리가 터진다. 그래서 최대한 가볍게 저장한다. 사용자의 id만 저장할거야
    return done(null, user.id) // req.login의 user가 위의 user로 오게되고 거기에서 id만 따로 저장하는 것.
  })
  passport.deserializeUser(async (id, done) => { // 쿠키가 정상적으로 심어지면 요청 때마다 알아서 쿠키가 같이 넘어간다. 
    try {                                        // 그런데 지금 쿠키를 통해 우리가 알 수 있는 것은 오직 user.id,
      const user = await db.User.findOne({ 
        where: { id }, // 그래서 그 id를 통해 우리가 원하는 유저정보를 얻기위한 deserializeUser !
        atttibutes: ['id', 'nickname'] // 이 부부느 코드가 처음에는 없었는데, 그러면 req.user에 비밀번호까지 들어가니 이 코드가 필요.
      }) 
      return done(null, user)                    // 이 deserializeUser는 언제 실행되느냐? 로그인 후, 모든 요청 떄마다 실행되어 req.user에 넣어준다. 또한 req.isAuthenticated()를 true로 만들어주어 로그인 여부 파악가능하다.
    } catch (err) {                              // 즉 모든 요청시마다 db에 한번씩은 접근하게 되니까 문제가 될 수 있어 나중에는 이부분을 캐싱해준다.
      console.error(err)                         // 백엔드는 db 접속 최소화가 중요해..
      return done(err)
    }

  })
  local()
}