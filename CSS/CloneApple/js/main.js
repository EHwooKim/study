(() => {

  let yOffset = 0 // window.pageYOffset (현재 스크롤 위치) 대신 쓸 변수
  let prevScrollHeight = 0 // 현재 스크롤 위치(yOffSet)보다 이전에 위차한 스크롤 섹션들의 스크롤 높이값의 합 
  let currentScene = 0 // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

  const sceneInfo = [ // 각 씬에 대한 정보를 담을 배열
    { // 0
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight를 세팅하겠다. (기기마다 높이가 다르기 때문에 고정값을 주면 애니메이션이 원하는대로 작동 안할수있기때문에)
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0')
      }
    },
    { // 1
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1')
      }
    },
    { // 2
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2')
      }
    },
    { // 3
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3')
      }
    },
  ]
  function setLayout() { 
    for (let i = 0; i < sceneInfo.length; i++) { // 각 스크롤 섹션의 높이 세팅
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
    }

    yOffset = window.pageYOffset 
    let totalScrollHeight = 0
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight
      if (totalScrollHeight >= yOffset) {
        currentScene = i
        break
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`)
  }

  
  function scrollLoop() { // 현재 진행중인 section 판단하기 
    prevScrollHeight = 0
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++
      document.body.setAttribute('id', `show-scene-${currentScene}`)
    }
    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지 (IOS 모바일)
      currentScene--
      document.body.setAttribute('id', `show-scene-${currentScene}`)
    }
    // document.body.setAttribute('id', `show-scene-${currentScene}`) 처음에 이렇게 썼다가 새로고침시에도 currentScene 세팅되게 하는 코드 작성 후 스크롤 때마다 재할당되는 것이 아닌 currentScene이 바뀔때 실행되게 위에 작성함.
  }

  
  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset 

    scrollLoop()
  })
  // window.addEventListener('DOMContentLoaded', setLayout) // 'DOMContentLoaded' - HTML 객체들, DOM구조만 로드되면 실행 (이미지등은 로드 안되어도 실행되기에 실행되는 시점이 load보다 빠르다)
  window.addEventListener('load', setLayout) // 'load' - 웹 페이지의 이미지 등의 리소스가 모두 로딩이된 후 실행, 우리가 하는건 지금 이미지가 있어야 의미있으니 load쓰겠다
  window.addEventListener('resize', setLayout) // 브라우저 크기 변할 떄마다 높이 재설정을 위해
  
})()