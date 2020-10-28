import React from 'react'
import './index.css'

function SkeletonElement({ type }) {
  return (
    <div className={`element__wrapper ${type}`}>
    </div>
  )
}

export default SkeletonElement