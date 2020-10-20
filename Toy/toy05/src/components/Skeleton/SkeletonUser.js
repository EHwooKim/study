import React from 'react'
import styled from 'styled-components'
import SkeletonElement from './SkeletonElement/SkeletonElement'

const StyledSkeletonUser = styled.div`
  margin: 20px auto;
  padding: 10px 15px;
  background: rgb(243,242,243);
  display: grid;
  grid-template-columns: 1fr 2fr;
`

function SkeletonUser() {
  return (
    <StyledSkeletonUser>
      <SkeletonElement type="avatar"/>
      <div className="info">
        <SkeletonElement type="title"/>
        <SkeletonElement type="text"/>
        <SkeletonElement type="text"/>
      </div>

    </StyledSkeletonUser>
  )
}

export default SkeletonUser