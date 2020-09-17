import React, { useEffect } from 'react'
import axios from 'axios'

function DetailProductPage(props) {

  const productId = props.match.params.productId

  useEffect(() => {
    axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then(res => {
        console.log(res.data)
        if (res.data.success) {
          
        } else {
          alert('상세 정보 가져오기를 실패했습니다.')
        }
      })
  }, [])

  return (
    <div>
      DetailProductPage
    </div>
    
  )
} 

export default DetailProductPage