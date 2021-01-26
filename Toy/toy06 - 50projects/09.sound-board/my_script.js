(() => {
  const audioList = document.querySelectorAll('audio')
  let currentAudio

  audioList.forEach(audio => {
    const audioName = audio.id
    const button = document.createElement('button')

    button.classList.add('btn')
    button.innerText = audioName

    button.addEventListener('click', e => {
      stopSongs()

      playSong(audio)
    })

    document.querySelector('.btns').appendChild(button)
  })

  function stopSongs() {
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
    }
  }
  function playSong(audio) {
    currentAudio = audio
    currentAudio.play()
  }
})()