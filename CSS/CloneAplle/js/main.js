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
  function setLayout() { // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
    }
  }

  
  function scrollLoop() { // 현재 진행중인 section 판단하기 
    prevScrollHeight = 0
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++

    }
    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지 (IOS 모바일)
      currentScene--
    }
    console.log(currentScene)
  }

  window.addEventListener('resize', setLayout) // 브라우저 크기 변할 떄마다 높이 재설정을 위해
  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset 

    scrollLoop()
  })
  setLayout()
})()