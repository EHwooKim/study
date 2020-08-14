const passport = require('passport')
const local = require('./local')
const db = require('../models')

module.exports = () => {
  console.log('index - 0')
  passport.serializeUser((user, done) => {
    console.log('index - 1')
    return done(null, user.id)
  })
  passport.deserializeUser( async (id, done) => {
    try {
      console.log('index - 2')
      const user = await db.User.findOne({
        where: { id },
        attributes: ['id', 'userId', 'githubId', 'isAdmin' ]
      })
      return done(null, user)
    } catch(err) {
      console.log('index - 3')
      console.error(err)
      return done(err)
    }
  })
  local()
}