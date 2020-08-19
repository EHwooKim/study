import axios from 'axios'
const baseUrl = 'http://localhost:4000'

const api = {
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
  }
}

export default api