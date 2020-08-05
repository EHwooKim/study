const baseUrl = 'http://localhost:4000'

module.exports = {
  getAllTodos: () => {
    return fetch(`${baseUrl}/todo`).then(data => data.json())
  }
}
