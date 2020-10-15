const { compilation } = require("webpack")

// 플러그인은 클래스로 작성한다.
class MyWebpackPlugin {
  
  // apply 메소드
  apply(compiler) {
    // compiler 객체, hooks.done.tap에 두가지 인자 (문자열, 콜백)
    // 플러그인이 완료됐을 때 동작하는 콜백 
    compiler.hooks.done.tap('My Plugin', stats => {
      console.log('MyPlugin: done') // (플러그인이 제대로 동작하는지 체크해보자)
    })

    // 웹팩 내장 플러그인 BannerPlugin을 통해 플러그인이 어떻게 번들링 결과물에 접근하는지 알아보자.
    compiler.plugin('emit', (compilation, callback) => {

      // compilation을 통해 웹팩이 빌드(번들링)한 결과물에 접근할 수 있다.
      // compilation.assets['main.js'] 을 통해 source 함수에 접근 할수 있고 이를 실행시켜 번들된 결과물을 확인
      const source = compilation.assets['main.js'].source()
      // console.log(source)

      // 위 코드로 번들 결과물에 접근 가능한 것을 확인했으니
      // 주석으로 빌드된 시간을 추가하는 코드를 작성해보자.
      compilation.assets['main.js'].source = () => { // source 함수를 재정의
        const banner = [ // banner를 만들어서
          '/**',
          ' * 이것은 BannerPlugin이 처리한 결과입니다.',
          ' * Build Data: 2020-10-07',
          ' */'
        ].join('\n')
        return banner + '\n\n' + source // 원본 source에 banner추가
        // 빌드 후 main.js 파일을 확인해보면 상단에 주석이 추가된 것을 확인할 수 있다.
      }

      callback()
    })

  }
}

module.exports = MyWebpackPlugin