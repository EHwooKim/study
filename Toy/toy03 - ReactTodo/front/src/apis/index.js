import axios from 'axios'
const baseUrl = 'http://localhost:4000'

const api = {
  // Todo
  getAllTodos: () => {
    return axios.get(`${baseUrl}/todo`, {
      withCredentials: true
    })
  },
  postNewTodo: (payload) => {
    return axios.post(`${baseUrl}/todo`, payload, {
      withCredentials: true
    })
  },
  deleteTodo: (payload) => {
    return axios.delete(`${baseUrl}/todo`, { data: {...payload},
      withCredentials: true
    })
  },

  // User
  signup: (payload) => {
    console.log(payload)
    return axios.post(`${baseUrl}/user/signup`,
      payload, {
      withCredentials: true
    })
  },
  login: (payload) => {
    return axios.post(`${baseUrl}/user/login`,{
      ...payload
    }, {
      withCredentials: true,
    })
  },
  logout: () => {
    return axios.get(`${baseUrl}/user/logout`, {
      withCredentials: true,
    })
  },
  getUser: () => {
    return axios.get(`${baseUrl}/user`, {
      withCredentials: true
    })
  },
  searchUser: (payload) => {
    return axios.get(`${baseUrl}/user/search?userAccount=${payload.userAccount}`,{
      withCredentials: true
    })
  },
  follow: (payload) => {
    return axios.post(`${baseUrl}/user/${payload.id}/follow`, {}, {
      withCredentials: true
    })
  }
}

export default api