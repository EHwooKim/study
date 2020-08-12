import axios from 'axios'

const baseUrl = 'https://jsonplaceholder.typicode.com'

const Post = {
  all: () => 
    axios.get(`${baseUrl}/posts`),
  detail: async id => {
    let post = axios.get(`${baseUrl}/posts/${id}`)
    let comment = axios.get(`${baseUrl}/posts/${id}/comments`)
    return {post: await post, comment: await comment}
  }
}

const User = {
  all: () => 
    axios.get(`${baseUrl}/users`),
  detail: async id => {
    let user = axios.get(`${baseUrl}/users/${id}`)
    let post = axios.get(`${baseUrl}/users/${id}/posts`)
    let comment = axios.get(`${baseUrl}/users/${id}/comments`)
    let album = axios.get(`${baseUrl}/users/${id}/albums`)
    return {user: await user, post: await post, comment: await comment, album: await album}
  }
    
}

const Album = {
  all: () => 
    axios.get(`${baseUrl}/albums`),
  detail: id => 
    axios.get(`${baseUrl}/albums/${id}/photos`)
}

export default {
  Post,
  User,
  Album
}