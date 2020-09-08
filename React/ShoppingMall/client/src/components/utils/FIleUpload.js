import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd'
import axios from 'axios'

function FileUpload() {
  const [images, setImages] = useState([])

  const dropHandler = (files) => {
    // 파일 전송시에는 FormData, config 필요
    let formData = new FormData()
    const config = {
      haeder: {'content-type': 'multipart/form-data'}
    }
    formData.append('file', files[0])
    axios.post('/api/product/image', formData, config)
      .then(response => {
        if (response.data.success) {
          setImages([...images, response.data.filePath])
        } else {
          alert('파일을 저장하는데 실패했습니다.')
        }
      })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={dropHandler}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div 
              style={{
                width: 300, height: 240, border: '1px solid lightgray', 
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
              {...getRootProps()}>
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: '3rem' }} />
            </div>
          </section>
        )}
      </Dropzone>

      <div style={{ display: 'flex', width: '350px', height: '240px', overflowX:'scroll' }}> 
        {images.map((image, index) => (
          <div key={index}>
            <img style={{ minWidth: '300px', width: '300px', height: '240px'}}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FileUpload