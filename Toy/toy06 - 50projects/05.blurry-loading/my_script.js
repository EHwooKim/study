(() => {
  const containerEl = document.querySelector('.container')
  const countEl = document.querySelector('.count')
  let count, time

  loadingHandler({
    duration: 2
  })

  function loadingHandler({ duration }) {
    const interval = (duration * 1000) / 100
    count = 0

    time = setInterval(blurring, interval)
  }

  function blurring() {
    count++
    if (count > 99) {
      clearInterval(time)
    }

    countEl.innerText = `${count}%`
    countEl.style.opacity = `${1 - count / 100}`
    containerEl.style.filter = `blur(${10 - count / 10}px)`
  }
})()