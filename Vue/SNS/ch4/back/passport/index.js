const passport = require('passport')

module.exports = () => { // 함수를 모듈로 만드는 이유는 나중에 불러올 떄 재사용이 편하도록!
  passport.serializeUser(() => {

  })
  passport.deserializeUser(() => {
    
  })
}