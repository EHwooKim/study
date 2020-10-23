import styled, { css, keyframes } from 'styled-components'

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

const themeObj = {
  light: {
    background: '#ddd'
  },
  dark: {
    background: '#777'
  }
}

const themeStyle = ({ theme }) => css`
  background: ${themeObj[theme]['background']};
`

export const StyledSkeletonElement = styled.div`
  margin: 10px 0;
  border-radius: 4px;

  ${typeStyles}
  ${themeStyle}
`

StyledSkeletonElement.defaultProps = {
  type: 'text',
  theme: 'light'
}