var express = require('express');
var router = express.Router(); // router 객체는 exress.Router()로 만듭니다.
// 따로 이렇게 파일을 분리하지 않고 app.js에서 app.get('/', 미들웨어) 형태로 작성해도 동작하는 것은 동일하지만, 이렇게 분리하는 것이 코드관리가 편하다.

// app.use처럼 하나의 router에 여러개의 미들웨어를 장착할 수 있습니다. => 이를 이용해 로그인 여부, 관리자 여부 등을 체크하는 미들웨어를 앞에 둘 수 있습니다.
/* GET home page. */
router.get('/', function(req, res, next) { // router.get 이면 GET 요청에 대한 처리를 합니다. get 외에도 HTTP 메서드를 모두 사용할 수 있습니다. 
  res.render('index', { title: 'Express' }); // res.render 메서드로 클라이언트에 응답을 보냅니다. 템플릿 엔진을 사용하는 부분입니다.
}); // res 객체에 들어있는 메서드들로 응답을 보냅니다.
    // 요청을 보낸 클라이언트에게 응답을 보내는 메서드가 다양하게 있지만 주로 send, sendFile, jsom, redirect, render를 사용합니다.

module.exports = router; // 만들어진 router 객체를 module.exports 하여 모듈화합니다.
