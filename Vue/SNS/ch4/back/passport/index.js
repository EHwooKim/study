// 세션에 사용자 정보를 어떻게 저장하느냐!
const passport = require('passport')

module.exports = () => { // 함수를 모듈로 만드는 이유는 나중에 불러올 떄 재사용이 편하도록!
  // req.login 실행시 딱 한번 실행되는 passport.serializeUser.
  passport.serializeUser((user, done) => { // 이용자 수가 굉장히 많아진다면 사용자 정보를 서버에 다 저장하는 것만으로도 메모리가 터진다. 그래서 최대한 가볍게 저장한다. 사용자의 id만 저장할거야
    return done(null, user.id) // req.login의 user가 위의 user로 오게되고 거기에서 id만 따로 저장하는 것.
  })
  passport.deserializeUser(() => {
    
  })
}