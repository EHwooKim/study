// 다양한 로그인 방법에 통일된 틀을 제공해서 어떤 방법의 로그인이든 가능하게 해주는 것
const passport = require('passport')
const bcrypt = require('bcrypt') // bcrypt로 암호화했었지
const db = require('../models')
const { Strategy: LocalStrategy } = require('passport-local')

module.exports = () => {
  passport.use(new LocalStrategy({ //app.js에서 로그인시 이메일, 비밀번호 확인을 여기서 하는거다.
    usernameField: 'email',   // req.body.email 이라서 email
    passwordField: 'password' // req.body.password 라서 password
  }, async (email, password, done) => { // 위에서 사용한 email 과 password 그리고 done을 받는다
    try {
      const exUser = await db.User.findOne({ where: { email } }) // 검사는 db에서 하는거겠지, email로 일단 찾아보고 있으면 다음단계고 없으면 비밀번호 검사도 필요없겠지
      if (!exUser) {
        return done(null, false, { reason: '존재하지 않는 사용자입니다.'}) // done(에러, 성공, 실패) 순서
      }
      const result = await bcrypt.compare(password, exUser.password) // 사용자가 있으면 비밀번호 검사 - bcrypt에 compare로 검사한다. bcrypt.compare(입력한 비밀번호, db의 아이디에 해당하는 비밀번호) 일치하면 result가 true, 아니면 false
      if (result) {
        return done(null, exUser) // 성공시 사용자 정보를 넘겨준다.
      } else {
        return done(null, false, { reason: '비밀번호가 틀립니다.'})
      }
    } catch (err) {
      console.error(err)
      return done(err) // 첫번째자리의 에러는 언제 쓰냐하면 db요청시, 특히 비동기 요청시에 에러가 가끔 발생하는데 그떄 쓰인다.
    }    
  }))   
}