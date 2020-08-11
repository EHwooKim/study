import React, { useState, useEffect } from 'react'

import { Table } from 'antd'
import axios from 'axios'

function Album() {
  const [album, setAlbum] = useState([])

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      render: title => <a>{title}</a>
    },
  ];

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/albums')
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