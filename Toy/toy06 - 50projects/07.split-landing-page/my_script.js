const containerEl = document.querySelector('.container')
const left = document.querySelector('.left')
const right = document.querySelector('.right')

left.addEventListener('mouseenter', () => containerEl.classList.add('hover-left'))
left.addEventListener('mouseleave', () => containerEl.classList.remove('hover-left'))

right.addEventListener('mouseenter', () => containerEl.classList.add('hover-right'))
right.addEventListener('mouseleave', () => containerEl.classList.remove('hover-right'))