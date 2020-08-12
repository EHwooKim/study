import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Divider, Row, Col, Tabs, List } from 'antd';

import api from '../api'

const { TabPane } = Tabs

function UserDetail() {
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [albums, setAlbums] = useState([])
  

  const UserId = useParams().id

  useEffect(() => {
    api.User.detail(UserId)
      .then(res => {
        console.log(res)
        setUser(res.user.data)
        setPosts(res.post.data)
        setComments(res.comment.data)
        setAlbums(res.album.data)
      })
  }, [UserId])

  return (
    <div>
      <h2>{user.username}'s profile</h2>
      <Divider orientation="left" plain>
        User Info
      </Divider>
      <Row>
        <Col>
          <p><strong>name: </strong>{user.name}</p>
          <p><strong>email: </strong>{user.email}</p>
          <p><strong>phone: </strong>{user.phone}</p>
          <p><strong>website: </strong>{user.website}</p>
        </Col>
      </Row>
      <Row>
        <Tabs defaultActiveKey="1">
          <TabPane tab="posts" key="1" style={{ height: 400, overflow: 'scroll' }}>
            <List
              size="small"
              bordered
              dataSource={posts}
              renderItem={post => <List.Item><Link to={`/post/${post.id}`}>{post.body}</Link></List.Item>}
            />
          </TabPane>
          <TabPane tab="comments" key="2" style={{ height: 400, overflow: 'scroll' }}>
            <List
                size="small"
                bordered
                dataSource={comments}
                renderItem={comment => <List.Item><Link to={`/post/${comment.postId}`}>{comment.body}</Link></List.Item>}
              />
          </TabPane>
          <TabPane tab="albums" key="3" style={{ height: 400, width: '100%', overflow: 'scroll' }}>
            <List
              size="small"
              bordered
              dataSource={albums}
              renderItem={album => <List.Item><Link to={`/album/${album.id}`}>{album.title}</Link></List.Item>}
            />
          </TabPane>
        </Tabs>
      </Row>

    </div>
  )
}

export default UserDetail