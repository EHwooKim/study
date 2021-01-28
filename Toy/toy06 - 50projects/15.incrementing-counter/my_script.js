(function() {
  const countEls = document.querySelectorAll('.count')
  
  countEls.forEach(count => {
    const Limit = +count.innerText
    count.innerText = '0'
  

    const updateCounter = () => {
      console.log('updateCounter')
      const c = +count.innerText

      const increment = Limit / 200

      if (c < Limit) {
        count.innerText = `${Math.ceil(c + increment)}`
        setTimeout(updateCounter, 1)
      } else {
        count.innerText = Limit
      }
    }
    updateCounter()

  })
})()