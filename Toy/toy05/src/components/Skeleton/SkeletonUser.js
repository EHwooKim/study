import React from 'react'
import styled from 'styled-components'
import SkeletonElement from './SkeletonElement/SkeletonElement'
import { StyledSkeletonWrapper } from './StyledSkeletonWrapper'
import Shimmer from './Shimmer/Shimmer'

const StyledSkeletonUser = styled(StyledSkeletonWrapper)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  align-items: center;
`

function SkeletonUser({ theme }) {
  return (
    <StyledSkeletonUser theme={theme}>
      <SkeletonElement theme={theme} type="avatar"/>
      <div className="info">
        <SkeletonElement theme={theme} type="title"/>
        <SkeletonElement theme={theme} type="text"/>
        <SkeletonElement theme={theme} type="text"/>
      </div>
      <Shimmer theme={theme}/>
    </StyledSkeletonUser>
  )
}

export default SkeletonUser