import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios'
import { Icon, Col, Card, Row, Carousel } from 'antd'
import Meta from 'antd/lib/card/Meta'
import ImageSlider from '../../utils/ImageSlider'
import CheckBox from './Sections/CheckBox'
import RadioBox from './Sections/RadioBox'
import { continents, price } from './Sections/Datas'

function LandingPage() {
  const [products, setProducts] = useState([])
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(8)
  const [postSize, setPostSize] = useState(0)
  const [filters, setFilters] = useState({
    continents: [],
    price: []
  })

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

  const showFilteredResults = (filters) => {
    let body = { 
      skip: 0,
      limit: limit,
      filters: filters
    } 
    getProducts(body)
    setSkip(0)
  }

  const handlePrice = (value) => {
    const data = price
    let array = data
      .filter(v => v._id === value)
      .map(v => v.array)
    
    return array[0]
  }

  const handleFilters = (filters, category) => {
    const newFilters = { ...filters }
    newFilters[category] = filters

    if (category === 'price') {
      let priceValues = handlePrice(filters)
      newFilters[category] = priceValues
    }
    
    showFilteredResults(newFilters)
    setFilters(newFilters)
  }

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Let's Travel Anywhere <Icon type="rocket"></Icon></h2>
      </div>

      {/* Filter */}
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          {/* Check Box */}
          <CheckBox list={continents} handleFilters={filters => handleFilters(filters, 'continents')} />
        </Col>
        <Col lg={12} xs={24}>
          {/* Radio Box */}
          <RadioBox list={price} handleFilters={filters => handleFilters(filters, 'price')} />
        </Col>
      </Row>
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
