import React, {useState, useEffect} from 'react'
import { Typography, Button, Form, Input } from 'antd'
import FileUpload from '../../utils/FIleUpload'
import Axios from 'axios'

const { Title } = Typography
const { TextArea } = Input

const Continents = [
  { key: 1, value: 'Africa' },
  { key: 2, value: 'Europe' },
  { key: 3, value: 'Asia' },
  { key: 4, value: 'North America' },
  { key: 5, value: 'South America' },
  { key: 6, value: 'Australia' },
  { key: 7, value: 'Antarctica' },
]

function UploadProductPage(props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [continent, setContinent] = useState(1)
  const [images, setImages] = useState([])

  const titleChangeHandler = (e) => {
    setTitle(e.currentTarget.value)
  }
  const descriptionChangeHandler = (e) => {
    setDescription(e.currentTarget.value)
  }
  const priceChangeHandler = (e) => {
    setPrice(e.currentTarget.value)
  }
  const continentChangeHandler = (e) => {
    setContinent(e.currentTarget.value)
  }
  
  const updateImages = (newImages) => {
    setImages(newImages)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (!title || !description || !price || !continent || !images) {
      return alert('모든 값을 넣어주셔야 합니다.')
    }

    const body = {
      // 로그인 된 사람의 ID 가져오기 - redux에서 가져오거나 auth.js 에서 넘겨준 props에서 가져오면 된다.
      writer: props.user.userData._id,
      title: title,
      description: description,
      price: price,
      continents: continent,
      images: images
    }
    console.log(body)
    Axios.post('/api/product', body)
      .then(res => {
        if (res.data.success) {
          alert('상품 업로드에 성공했습니다.')
          props.history.push('/') // 여기도 props에서 가져온 이유가..?
        } else {
          alert('상품 업로드에 실패했습니다.')
        }
      })

  }

  return (
    <div style={{maxWidth: '700px', margin: '2rem auto'}}>
      <div style={{ textAlign:'center', marginBottom: '2rem'}}>
        <Title level={2}> 여행 상품 업로드 </Title>
      </div>
      
      <Form onSubmit={submitHandler}>
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={title}/>
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptionChangeHandler} value={description}/>
        <br />
        <br />
        <label>가격</label>
        <Input type="number" onChange={priceChangeHandler} value={price}/>
        <br />
        <br />        
        <select onChange={continentChangeHandler} value={continent}>
          {Continents.map(item => (
            <option key={item.key} value={item.key}>{item.value}</option>
          ))}
        </select>
        <br />
        <br />
        <Button htmlType="submit">
          확인
        </Button>
      </Form>
    </div>
  )
}

export default UploadProductPage 