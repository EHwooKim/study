const passport = require('passport')
const bcrypt = require('bcrypt')
const db = require('../models')
const { Strategy: LocalStrategy } = require('passport-local')

module.exports = () => {
  console.log('local - 0')
  passport.use(new LocalStrategy({
    usernameField: 'userId',
    passwordField: 'password'
  }, async (userId, password, done) => {
    try {
      console.log('local - 1')
      const exUser = await db.User.findOne({ where: { userId }})
      if (!exUser) {
        console.log('local - 2')
        return done(null, false, { reason: '존재하지 않는 사용자입니다.' })
      }
      const result = await bcrypt.compare(password, exUser.password)
      if (result) {
        console.log('local - 3')
        return done(null, exUser)
      } else {
        console.log('local - 4')
        return done(null, false, { reason: '비밀번호가 틀립니다.'})
      }
    } catch (err) {
      console.log('local - 5')
      console.error(err)
      return done(err)
    }
  }
  ))
}