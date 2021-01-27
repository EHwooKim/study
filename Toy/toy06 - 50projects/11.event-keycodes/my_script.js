(() => {
  const containerEl = document.querySelector('.container')

  window.addEventListener('keydown', e => {
    const { key, keyCode, code } = e;
    const resultEl = [key, keyCode, code].map(v => {
      return `<div class="box">${v === ' ' ? 'spave' : v}</div>`
    }).join('')
    containerEl.innerHTML = resultEl
  })
})()