import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Card, Row, Col } from 'antd'

import api from '../api'

const { Meta } = Card;

function AlbumDetail() {
  const [photos, setPhotos] = useState([])
  const AlbumId = useParams().id

  useEffect(() => {
    api.Album.detail(AlbumId)
      .then(res => setPhotos(res.data))
  }, [AlbumId])

  return (
    <Row gutter={[16, 24]}>
      {photos.map(photo => (
        <Col span={6}>
          <Card
            style={{ width: 200 }}
            cover={
              <img
                alt={photo.title}
                src={photo.thumbnailUrl}
              />
            }
          >
            <Meta
              title={photo.title}
            />
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default AlbumDetail