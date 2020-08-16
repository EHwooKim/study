exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  console.log('로그인이 필요합니다.')
  return res.status(401).send('로그인이 필요합니다.')
}

exports.isNotLoggedIn = (req, res, next) => {
  console.log('isNotLoggedIn')
  if (!req.isAuthenticated()) {
    return next()
  }
  return res.status(401).send('로그인한 사람은 이용할 수 없습니다.')
}