const btnEls = document.querySelectorAll('button')

btnEls.forEach(btn => btn.addEventListener('click', () => {
  let parentEl = btn.parentElement
  while (!parentEl.classList.contains('card')) {
    parentEl = parentEl.parentElement
  }
  parentEl.classList.toggle('active')
}))

