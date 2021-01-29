const left = document.querySelector('.left')
const right = document.querySelector('.right')
const downBtn = document.querySelector('.down-button')
const upBtn = document.querySelector('.up-button')
const slidesLength = left.querySelectorAll('div').length

let currentIndex = 0

left.style.top = `-${(slidesLength - 1) * 100}vh`

const onClick = direction => {
  if (direction === 'up') {
    currentIndex = (currentIndex + 1) % slidesLength
  } else {
    currentIndex--
    if (currentIndex < 0) {
      currentIndex = slidesLength - 1
    }
  }
  left.style.transform =  `translateY(${currentIndex * 100}vh)`
  right.style.transform =  `translateY(-${currentIndex * 100}vh)`
}

upBtn.addEventListener('click', () => onClick('up'))
downBtn.addEventListener('click', () => onClick('down'))

