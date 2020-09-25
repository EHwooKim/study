(() => {

  const actions = {
    birdFlies(key) {
      if (key) {
        document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`
      } else {
        document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`
      }
    },
    birdFlies2(key) {
      if (key) {
        document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`
      } else {
        document.querySelector('[data-index="5"] .bird').style.transform = `translate(-100%)`
      }
    }

  }

  const stepElems = document.querySelectorAll('.step')
  const graphicElems = document.querySelectorAll('.graphic-item')
  let currentItem = graphicElems[0]; // 현재 visible인 .graphic-item을 담을 변수
  let ioIndex;

  // IntersectionObserver 생성자 호출 및 callback 함수(entries, observer 매개변수)
  let io = new IntersectionObserver((entries, observer) => { 
    ioIndex = entries[0].target.dataset.index * 1
  }) 
  // 아래 for문에서 관찰 대상 등록해야 작동


  function activate(action) {
    currentItem.classList.add('visible')
    if (action) {
      actions[action](true)
    }
  }

  function inactivate(action) {
    currentItem.classList.remove('visible')
    if (action) {
      actions[action](false)
    }    
  }
  
  for (let i = 0; i < stepElems.length; i++) {
    io.observe(stepElems[i]) // 관찰 대상 등록
    stepElems[i].dataset.index = i
    graphicElems[i].dataset.index = i
  }
  
  window.addEventListener('scroll', () => {
    let step
    let boundingRect

    // for (let i = 0; i < stepElems.length; i++) { 전체 step 탐색에서 앞뒤 step까지만 체크하는 방법으로
    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = stepElems[i]
      if (!step) continue
      boundingRect = step.getBoundingClientRect()
      
      if (boundingRect.top > window.innerHeight * 0.1
        && boundingRect.top < window.innerHeight * 0.8) {
          inactivate(currentItem.dataset.action)
          currentItem = graphicElems[step.dataset.index]
          activate(currentItem.dataset.action)
        }
    }

  })

  window.addEventListener('load', () => {
    setTimeout(() => scrollTo(0, 0), 100)
  })

  activate() // 첫번째 사진은 visible인 상태로 시작
})()