(() => {
  createProgress(5)

  const roundEls = document.querySelectorAll('.round')
  const prevBtn = document.querySelector('#prev')
  const nextBtn = document.querySelector('#next')
  const barEl = document.querySelector('.bar')
  roundEls[0].classList.add('active')
  let totalLength = roundEls.length - 1
  let currentLength = 0;

  prevBtn.addEventListener('click', () => {
    roundEls[currentLength].classList.remove('active')
    currentLength = Math.max(0, currentLength - 1)

    buttonHandler()
    progressHandler()
  })

  nextBtn.addEventListener('click', () => {
    currentLength = Math.min(totalLength, currentLength + 1)
    roundEls[currentLength].classList.add('active')

    buttonHandler()
    progressHandler()
  })

  function createProgress(step) {
    const progressEl = document.querySelector('.progress')
    for (let i = 1; i < step + 1; i++) {
      const divEl = document.createElement('div')
      divEl.classList.add('round')
      divEl.innerText = i
      progressEl.appendChild(divEl)
    }
  }

  function progressHandler() {
    barEl.style.width = `${currentLength / totalLength * 100}%`
  }
  
  function buttonHandler() {
    if (currentLength === totalLength) {
      nextBtn.disabled = true
    } else if (currentLength === 0) {
      prevBtn.disabled = true
    } else {
      nextBtn.disabled = false
      prevBtn.disabled = false
    }
  }
})()