import React, { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import api from '../api'

import { Card, Col, Row } from 'antd'

function User() {
  const [user, setUser] = useState([])
  let histody = useHistory()

  const handleClick = id => () => histody.push(`/user/${id}`)

  useEffect(() => {
    api.User.all()
      .then(res => setUser(res.data))
  }, [])

  return (
    <div>
      <h2>User</h2>
      <Row gutter={[16, 16]}>
        {user.map(user => (
          <Col span={6}>
            <Card title={user.username} hoverable onClick={handleClick(user.id)}>
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