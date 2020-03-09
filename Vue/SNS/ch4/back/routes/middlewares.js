exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next() // 로그인되어 있으면 다음 미들웨어로 - 인수가 비어있을때만, asb 같은 인수가 있으면 에러처리로 넘어간다는 것을 주의
  }
  return res.status(401).send('로그인이 필요합니다.')
}

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next()
  }
  return res.status(401).send('로그인한 사람은 이용할 수 없습니다.')  
}