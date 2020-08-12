import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Table } from 'antd'
import api from '../api.js'

function Post() {
  const [post, setPost] = useState([])
  
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      render: (text, record) => (
        <Link to={`/post/${record.id}`}>{record.title}</Link>
      ),
    },
  ];

  useEffect(() => {
    api.Post.all()
      .then(res => setPost(res.data))
  }, [])

  return (
    <div>
      <h2>Post</h2>
      <Table columns={columns} dataSource={post} />
    </div>
  )
}

export default Post