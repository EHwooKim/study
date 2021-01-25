(() => {
  const navBtn = document.querySelector('.nav-btn')
  const closeBtn = document.querySelector('#close')
  const openBtn = document.querySelector('#open')
  const sectionEl = document.querySelector('.container')
  const navEl = document.querySelector('#nav')
  
  

  openBtn.addEventListener('click', () => {
    navBtn.classList.add('rotate')
    sectionEl.classList.add('rotate')
    navEl.classList.remove('hide')
  })
  closeBtn.addEventListener('click', () => {
    navBtn.classList.remove('rotate')
    sectionEl.classList.remove('rotate')
    navEl.classList.add('hide')
  })

})()