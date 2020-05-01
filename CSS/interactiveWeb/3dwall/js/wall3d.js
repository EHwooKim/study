(function() {

  const stageElem = document.querySelector('.stage')
  const houseElem = document.querySelector('.house')
  const barElem = document.querySelector('.progress-bar')
  const mousePos = { x:0, y:0 }
  let maxScrollValue;
    // 스크롤이 움직일 수 있는 범위를 정해주자.
    // body 전체에서 마지막 스크롤 크기만큼 뺴주면 되겠지
    // console.log(document.body.offsetHeight - window.innerHeight) // 이게 전체 스크롤 범위
    // 그리고 아래의 방법을 쓰면 화면을 얼마나 내렸는지 비율이 나오겠지
    // console.log(pageYOffset / maxScrollValue)

  // 그런데 처음 계산된 값으로 house가 만들어 지는데 사용자가 윈도우 크기를 바꾸면 하우스는 안바뀌고 스크롤 범위만 바뀌어서 우리가 원하는 모습이 안나온다
  // 그래서 window 에 resize 이벤트를 달아서 그때마다 house가 바뀌게 해줘야한다.
  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight
  }

  window.addEventListener('scroll', function() {
    const scrollPer = pageYOffset / maxScrollValue
    const zMove = scrollPer * 980 - 490  // 0부터 1000의 값을 만들어서 활용하겠다
    houseElem.style.transform = `translateZ(${zMove}vw)`
    
    // progress bar
    barElem.style.width = `${scrollPer * 100}%`
  })

  window.addEventListener('mousemove', function(e) {
    // 마우스의 좌표
    // console.log(e.clientX, e.clientY)
    // 그런데 지금은 왼쪽 상단이 0,0 상태이다 보니까 각도계산이 어렵다. 화면 중앙이 0,0이 되도록 계산이 필요하다.
    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2 // 좌측이 -1, 우측이 1이 되도록 계산
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2 // 상단이 1, 하단이 -1이 되도록 계산
    // console.log(mousePos)
    // 벽뿐만 아니라 캐릭터도 같이 움직여야 자연스러울테니 houser가 아닌 stage 각도를 변경시켜야한다.
    // 회전을 시킬때 어떤 축을 회전시키고, 그 축을 회전시키기위해 어떤 값을 써야하는지 생각 잘하자.
    stageElem.style.transform = `rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`
  })

  window.addEventListener('resize', resizeHandler)
  resizeHandler() // 문서 불러왔을때 초기화 위해

})()