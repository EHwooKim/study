const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
module.exports = { // node의 모듈을 만든 것. 이 객체를 웹팩이 웹팩처리를 할 떄 사용하고 웹패킹이라 부르겠다.
  mode: 'development', // 배포시에는 production
  devtool: 'eval', // eval 하면 웹팩 빌드 속도가 빠르다. 배포시에는 hidden-source-map
  resolve: {
    extensions: ['.js', '.vue'],  // 확장자 처리. 다른 파일(main.js)에서 numberBaseball.vue 의 .vue를 지워도 알아서 인식한다.
  },
  entry: {
    app: path.join(__dirname, 'main.js'),
  },
  module: {
    rules: [{
      test: /\.vue$/, // 정규표현식. .vue로 끝나는 파일는 아래의 loader를 사용하겠다
      loader: 'vue-loader',
    }],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  output: {
    filename: 'app.js', // '[name].js' 로 써줘도 된다.
    path: path.join(__dirname, 'dist'), // 나중에 dist 폴더를 만들고 그 안에 app.js가 최종 결과물로 나올거다
  },
}