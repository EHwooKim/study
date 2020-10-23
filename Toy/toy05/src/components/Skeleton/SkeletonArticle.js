import React from 'react'
import SkeletonElement from './SkeletonElement/SkeletonElement'
import { StyledSkeletonWrapper } from './StyledSkeletonWrapper'
import Shimmer from './Shimmer/Shimmer'

function SkeletonArticle({ theme }) {
  return (
    <StyledSkeletonWrapper theme={theme}>
      <SkeletonElement theme={theme} type="title"/>
      <SkeletonElement theme={theme} type="text"/>
      <SkeletonElement theme={theme} type="text"/>
      <SkeletonElement theme={theme} type="text"/>
      <Shimmer theme={theme}/>
    </StyledSkeletonWrapper>
  )
}

export default SkeletonArticle