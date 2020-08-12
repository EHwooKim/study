import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

import { Table } from 'antd'

function Album() {
  const [album, setAlbum] = useState([])

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      render: (text, record) => (
        <Link to={`/album/${record.id}`}>{record.title}</Link>
      ),
    },
  ];

  useEffect(() => {
    api.Album.all()
      .then(res => setAlbum(res.data))
  }, [])

  return (
    <div>
      <h2>Album</h2>
      <Table columns={columns} dataSource={album} />
    </div>
  )
}

export default Album 