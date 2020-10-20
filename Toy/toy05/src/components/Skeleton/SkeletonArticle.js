import React from 'react'
import styled from 'styled-components'
import SkeletonElement from './SkeletonElement/SkeletonElement'

const StyledSkeletonArticle = styled.div`
  margin: 20px auto;
  padding: 10px 15px;
  background: rgb(243,242,243);
`

function SkeletonArticle() {
  return (
    <StyledSkeletonArticle>
      <div >
        <SkeletonElement type="title"/>
        <SkeletonElement type="text"/>
        <SkeletonElement type="text"/>
        <SkeletonElement type="text"/>
      </div>
    </StyledSkeletonArticle>
  )
}

export default SkeletonArticle