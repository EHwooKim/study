const path = require('path') 

module.exports = {
  name: 'wordrelay-setting', // 필수는 아닌, 내가 원하는 이름 지어주면된다
  mode: 'development', // 실서비스 때는 production으로 바꿔준다.
  devtool: 'eval', // 빠르게 하겠다는 뜻
  resolve: { // 확장자 관리
      extensions: ['.js', '.jsx']
  },

  entry: { // 가장 중요한 부분 entry(입력), output(출력)
    // 현재 clint.jsx파일과 WordRealy.jsx 파일 두개를 입력으로 받아서
    app: ['./client'], // WordRelay.jsx 파일도 합쳐줘야 하는데, 해당 파일은 client.jsx에서 불러와주고 있고 그런 관계는 웹팩이 알아서 찾아주기 때문에 안써도 된다.
                       // 확장자는 안써줘도 된다. 대신 resolve 옵션에 추가해줘야한다.
  },
  output: {
    // app.js 파일 하나로 출력하길 바라는거지
    path: path.join(__dirname, 'dist'), // 현재 폴더 안에 있는 dist폴더를 가르킨다
    filename: 'app.js' // 원하는 파일 이름
  }
}