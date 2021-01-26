(() => {
  const boxEls = document.querySelectorAll('.box')

  const options = {
    rootMargin: '0px 1000px'
  }
  
  const callback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
      } else {
        entry.target.classList.remove('show')
      }
    })
  }
  
  const io = new IntersectionObserver(callback, options)
  boxEls.forEach(box => io.observe(box))
})()