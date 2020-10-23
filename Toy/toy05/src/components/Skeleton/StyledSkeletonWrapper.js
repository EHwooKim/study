import styled, { css } from 'styled-components'

const themeObj = {
  light: {
    background: '#f2f2f2'
  },
  dark: {
    background: '#444'
  }
}

const themeStyle = ({ theme }) => css`
  background: ${themeObj[theme]['background']};
`

export const StyledSkeletonWrapper = styled.div`
  margin: 20px auto;
  padding: 10px 15px;
  border-radius:4px;
  position: relative;
  overflow: hidden;
  ${themeStyle}
`

StyledSkeletonWrapper.defaultProps = {
  theme : 'light',
}