const path = require('path')
modeul.exports = { // node의 모듈을 만든 것. 이 객체를 웹팩이 웹팩처리를 할 떄 사용하고 웹패킹이라 부르겠다.
  entry: {
    app: path.join(__dirname, main.js),
  },
  module: {
    rules: [{
          
    }],
  },
  plugins: [

  ],
  output: {
    filename: 'app.js', // '[name].js' 로 써줘도 된다.
    path: path.join(__dirname, 'dist'), // 나중에 dist 폴더를 만들고 그 안에 app.js가 최종 결과물로 나올거다
  },
}