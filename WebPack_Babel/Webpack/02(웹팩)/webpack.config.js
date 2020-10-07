// 절대경로 설정을 위한 path모듈
const path = require('path')

// node의 모듈 시스템 module.exports
module.exports = { 
  mode: 'development',
  entry: {
    main: './src/app.js'
  },
  output: {
    // output은 기본적으로 경로와 파일이름을 설정해준다. 
    path: path.resolve('./dist'), // 경로는 절대 경로를 사용하며 그를 위해 path모듈을 사용했다.
    filename: '[name].js' // 이렇게 작성해주면 entry의 key값 (여기서는 main)이 output 파일명이 된다.
                          // entry가 여러개일 수도 있는데 그럴 때 output의 이름을 동적으로 정해주기 위해 이와같이 사용했다.
  }
}