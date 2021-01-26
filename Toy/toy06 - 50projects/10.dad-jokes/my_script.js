const textEl = document.querySelector('.text')
const btn = document.querySelector('.button')



btn.addEventListener('click', fetchRandomText)

const config = {
  headers: {
    Accept: 'application/json',
  },
}

fetchRandomText()

async function fetchRandomText() {
  const res = await fetch('https://icanhazdadjoke.com/', config)
  const result = await res.json()

  textEl.innerText = result.joke
}

