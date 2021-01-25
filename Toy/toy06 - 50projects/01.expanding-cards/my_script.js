const panelEls = document.querySelectorAll('.panel')

let currentPanel = panelEls[0]

panelEls.forEach(el => {
  el.addEventListener('click', () => {
    currentPanel.classList.remove('active')
    currentPanel = el
    currentPanel.classList.add('active')  
  })
})