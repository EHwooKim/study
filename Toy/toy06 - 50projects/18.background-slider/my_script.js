const body = document.body
const slides = document.querySelectorAll('.slide')
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')

let activeSlide = 0

rightBtn.addEventListener('click', () => {

  activeSlide  = (activeSlide + 1) % slides.length

  setBgToBody()
  setActiveSlide()
})

leftBtn.addEventListener('click', () => {

  activeSlide--

  if (activeSlide < 0) {
    activeSlide = slides.length - 1
  }

  setBgToBody()
  setActiveSlide()
})

setBgToBody()



function setBgToBody() {
  body.style.backgroundImage = slides[activeSlide].style.backgroundImage
}

function setActiveSlide() {
  slides.forEach((slide, i) => {
    i === activeSlide
      ? slide.classList.add('active')
      : slide.classList.remove('active')
  })
}
