import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'

function ProductImage(props) {

  const [images, setImages] = useState([])

  useEffect(() => {
    console.log('detail', props.detail)
    if (props.detail.images && props.detail.images.length > 0) {
      let newImages = []

      props.detail.images.map(item => {
        newImages.push({
          original: `http://localhost:5000/${item}`,
          thumbnail: `http://localhost:5000/${item}`
        })
      })
      setImages(newImages)
    }
  }, [props.detail])


  return (
    <div>
      <ImageGallery items={images} />
    </div>
  )
}

export default ProductImage