import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios'
import { Icon, Col, Card, Row, Carousel } from 'antd'
import Meta from 'antd/lib/card/Meta'
import ImageSlider from '../../utils/ImageSlider'

function LandingPage() {
  const [products, setProducts] = useState([])
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(8)
  const [postSize, setPostSize] = useState(0)

  useEffect(() => {
    let body = { 
      skip,
      limit
    }

    getProducts(body)

  }, [])

  const getProducts = (body) => {
    axios.post('/api/product/products', body)
    .then(res => {
      if (res.data.success) {
        if (body.loadMore) {
          setProducts([...products, ...res.data.productInfo])  
        } else {
          setProducts(res.data.productInfo)
        }
        setPostSize(res.data.postSize)
      } else {
        alert('상품들을 가져오는데 실패했습니다.')
      }
    })
  }

  const loadMoreHandler = () => { 
    let nextSkip = skip + limit

    let body = { 
      skip: nextSkip,
      limit,
      loadMore: true
    }
  
    getProducts(body)
    setSkip(nextSkip)
  }


  const renderCards = products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card
          cover={<ImageSlider images={product.images} />}
        >
          <Meta
            title={product.title}
            description={`$${product.price}`}
          />
        </Card>
      </Col>
    )
  })

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Let's Travel Anywhere <Icon type="rocket"></Icon></h2>
      </div>

      {/* Filter */}
      {/* Search */}
      {/* Cards */}
      <Row gutter={[16, 16]}>
        {renderCards}
      </Row>

      <br/>
      {postSize >= limit && 
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      }
    </div>
  ) 
}

export default LandingPage
