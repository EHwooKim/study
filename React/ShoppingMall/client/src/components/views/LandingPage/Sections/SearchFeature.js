import React, { useState } from 'react'
import { Input } from 'antd'

const { Search } = Input

function SearchFeature(props) {
  const [searchTerm, setSearchTerm] = useState('')


  const searchHandler = e => {
    setSearchTerm(e.currentTarget.value)
    props.refreshFunction(e.currentTarget.value)
  }

  return (
    <div>
      <Search
        placeholder="검색어 입력"
        onChange={searchHandler}
        style={{ width: 200 }}
        value={searchTerm}
      />
    </div>
  )
}

export default SearchFeature