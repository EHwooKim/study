import React, { useState, useEffect } from 'react'

import { Card, Col, Row } from 'antd'

import axios from 'axios'

function User() {
  const [user, setUser] = useState([])

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setUser(res.data))
  }, [])

  return (
    <div>
      <h2>User</h2>
      <Row gutter={[16, 16]}>
        {user.map(user => (
          <Col span={6}>
            <Card title={user.username} hoverable>
              <p><strong>name: </strong>{user.name}</p>  
              <p><strong>email: </strong>{user.email}</p>  
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default User 