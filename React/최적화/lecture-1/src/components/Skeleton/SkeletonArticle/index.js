import React from 'react'
import './index.css'

import SkeletonElement from '../SkeletonElement'
import Shimmer from '../Shimmer'

function SkeletonArticle() {
  return (
    <div className={'skeleton__article__wrapper'}>
      <div>
        <SkeletonElement type="title"/>
        <SkeletonElement type="text"/>
        <SkeletonElement type="text"/>
        <SkeletonElement type="date"/>
      </div>
      <SkeletonElement type="thumbnail"/>
      <Shimmer />
    </div>
  )
}

export default SkeletonArticle