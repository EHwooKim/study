(() => {
  const containerEl = document.querySelector('.container')
  const inputEl = document.querySelector('.input')
  const btnEl = document.querySelector('.btn')


  btnEl.addEventListener('click', () => {
    containerEl.classList.toggle('active')
    inputEl.focus()
  })
})()