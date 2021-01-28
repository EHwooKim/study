const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=" '

const homeBtn = document.querySelector('.home')
const movieContainer = document.querySelector('.movie-container')
const searchForm = document.querySelector('.search')

fetchMovieAndRender()

homeBtn.addEventListener('click', () => {
  fetchMovieAndRender()
})

searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const inputEl = e.target.firstElementChild
  fetchMovieAndRender(inputEl.value)
  inputEl.value = ''
})


async function fetchMovieAndRender(value) {
  let FETCH_URL = ''

  if (value) {
    FETCH_URL = `${SEARCH_API}${value}"`
  } else {
    FETCH_URL = API_URL
  }

  const response = await fetch(FETCH_URL)
  const responseMovieData = await response.json()

  render(responseMovieData.results)
}


async function render(movieData) {
  movieContainer.innerHTML = ''

  movieData.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie

    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')

    movieEl.innerHTML =  `
      <img src="${IMG_PATH}${poster_path}">
      <div class="movie-info">
        <p>${title}</p>
        <span class="badge" style="color:${voteColor(vote_average)}">${vote_average}</span>
      </div>
      <div class="movie-preview">
        <h2>preview</h2>
        <p>${overview}</p>
      </div>
    `
    movieContainer.appendChild(movieEl)
  })
}

function voteColor(vote) {
  if (vote >= 8) return 'lightgreen'
  else if(vote >= 5) return 'orange'
  else return 'red'  
}