import styled, { css, keyframes } from 'styled-components'

const gradient = keyframes`
  0% {
    background-position: 110% 50%;
  }
  100% {
    background-position: -20% 50%;
  }
`

const types = {
  text: {
    width: '100%',
    height: '12px'
  },
  title: {
    width: '50%',
    height: '20px',
    'margin-bottom': '15px'
  },
  avatar: {
    width: '100px',
    height: '100px',
    'border-radius': '50%'
  },
  thumbnail: {
    width: '100px',
    height: '100px'
  }
}

const typeStyles = ({ type }) => {
  const selectedType = types[type]
  return css`
    ${Object.keys(selectedType).reduce((acc, cur) => {
      return acc + `${cur}: ${selectedType[cur]};\n`
    }, '')}
  `
}


export const StyledSkeletonElement = styled.div`
  background: linear-gradient(-45deg, #ddd 45%, rgb(230, 230, 230) 50% 51%, #ddd 55%);
  background-size: 200% 200%;
  animation: ${gradient} 1.5s linear infinite;
  margin: 10px 0;
  border-radius: 4px;

  ${typeStyles}
`

StyledSkeletonElement.defaultProps = {
  type: 'text'
}