const textArea = document.querySelector('textarea')
const badgeArea = document.querySelector('.badgeArea')

let inputText = ''
let inputToArr = []

textArea.addEventListener('input', () => {
  inputText = textArea.value
  inputToArr = inputText.split(',')
  rederBadge()
})

textArea.addEventListener('keyup', (e)=> {
  if (e.key === 'Enter') {
    randomPicker()
  }
})

function rederBadge() {
  const badgeHTML = inputToArr
    .map(text => text.trim(' ') && `<div class="badge">${text}</div>`)
    .join('')
  badgeArea.innerHTML = badgeHTML
}

function randomPicker() {
  const badges = document.querySelectorAll('.badge')
  const badgeLength = badges.length
  if (badgeLength !== 0) {
    textArea.value = ''
    textArea.setAttribute('readonly', '')

    let currentIndex = 0
    let time

    time = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * badgeLength)  
      badges[currentIndex].classList.remove('active')
      badges[randomIndex].classList.add('active')
      currentIndex = randomIndex
    }, 100);

    setTimeout(() => {
      clearInterval(time)
      textArea.removeAttribute('readonly', '')
      textArea.value = badges[currentIndex].innerText
    }, 5000)
  }  
}

