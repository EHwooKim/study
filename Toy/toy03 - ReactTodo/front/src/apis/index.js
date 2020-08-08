const baseUrl = 'http://localhost:4000'

module.exports = {
  getAllTodos: () => {
    console.log('조회')
    return fetch(`${baseUrl}/todo`)
      .then(data => data.json())
  },
  postNewTodo: (payload) => {
    return fetch(`${baseUrl}/todo`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(data => data.json())
  },
  deleteTodo: (payload) => {
    return fetch(`${baseUrl}/todo`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  }
}
