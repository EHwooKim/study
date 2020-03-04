const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt') // 비밀번호 암호화를 위한 코드

const db = require('./models') // models 폴더의 index 파일에서 exports한 db를 불러오겠지
const app = express()

db.sequelize.sync() // db를 실행하는 코드.
// db.sequelize.sync({ force: true }) // 서버 실행할 때마다 db 날리고 다시 만드는 옵션

// 프로그래밍을 하면서 내가 모든 것을 만들기보다 남의 코드를 쓰는 경우가 많은데
// 사용방법은 공식문서 보면서 하면 되니까 외우지않아도 된다. 다만 라이브러리간에 어떻게 연결해주고 어떻게 동작하는지는 알고 쓰자!
// app.use 를 통해 req와 res를 조작할 수 있어 express middleware라 부른다, app.get, app.post들도 사실 다 middleware들이다.
app.use(cors('http://localhost:3000')) 
app.use(express.json()) // express는 기본적으로 json을 body로 못받기 때문에 필요한 코드!
app.use(express.urlencoded({ extended: false })) // form을 통해서 전송할 떄 해당 데이터를 해석해서 req.body에 넣어주는 코드

app.get('/', (req, res) => { // 'localhost:3080/' 생략된 주소 '/' 
  res.send('안녕 EHwoo') // res.status(200).send('안녕 백엔드') 가 원래 모양.
})

app.post('/user', async (req, res, next) => {
  try{  // async await는 try catch감싸야하고,
    const hash = await bcrypt.hash(req.body.password, 12) // 비밀번호 암호화
    const exUser = await db.User.findOne({ // 중복 아이디 방지 
      email: req.body.email
    })
    if (exUser) { // 이미 회원가입되어이으면 에러도 성공도아닌 거절을 해야겠지 400대 코드
      return res.status(403).json({   //.send('이미회원가입되어있습니다.') 로 간단하게 보내줘도 되지만 실무에선 .json으로 자세한 데이터를 보낸다. // return 필수!
        errorCode: 1, // 위의 http 코드와 달리 이 에러코드는 맘대로 정할 수 있다.
        message: '이미 회원가입되어있습니다.', // 이 에러코드와 메세지는 맘대로 보내도 되지만 백과 프론트가 잘 맞춰야겠지,
        // res.send나 res.json을 사용하면 알아서 코드가 끝난다고 착각하는 사람들이 많은데 아니다, 반드시 return 시켜주자!
        // return 안해주면 응답이 두번가서 그 유명한 에러인 can't set headers after they are sent 가 뜨게 된다.
      })
    }
    const newUser = await db.User.create({
      // where: {
        email: req.body.email, //app.user(express.json())을 했기에 쓸 수 있는 코드.
        password: hash,
        nickname: req.body.nickname,
      // }
    })
    // 요청이 들어왔으니 그에 대한 응답을 해줘야겠지. 200: 성공, 201: 성공적으로 생성됨이라는 의미이니 디테일하게 201 응답 보내면 더 좋겠지. 또는 거절하는 등 마무리 잘해줘야겠지!
    return res.status(201).json(newUser) // .send는 문자열로 응답할 때. .json은 응답 body에 json으로 응답할 때. // return 안붙여도 정상작동 하긴하는데 정확하게 하기위해서 응답에는 return붙였다
  } catch (err) {
    console.log(err)
    return next(err) // next에 관한거 좀 더 알아보자.  // return 안붙여도 정상작동 하긴하는데 정확하게 하기위해서 응답에는 return붙였다
  }
})

app.listen(3085, () => { // 실제 배포시 포트 숫자는 안보이잖아, http면 80, https면 443 이렇게 바꾸고 뭔가 해주면 된다.
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`)
})