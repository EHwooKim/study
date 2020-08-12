import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import api from '../api'

function PostDetail() {
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const postId = useParams().id

  useEffect(() => {
    api.Post.detail(postId)
      .then(res => {
        console.log(res)
        setPost(res.post.data)
        setComments(res.comment.data)
      })
  }, [postId])

  return (
    <div>
      <h3>post</h3>
      {post.body}
      <hr/>
      <h3>comments</h3>
      {comments.map(comment => <p><strong>{comment.name} | </strong> {comment.body}</p>  )}
    </div>
  )
}

export default PostDetail