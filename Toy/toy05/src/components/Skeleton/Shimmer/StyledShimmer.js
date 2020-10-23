import styled, { css, keyframes } from 'styled-components'

const themeObj = {
  light: {
    background: 'rgba(255, 255, 255, 0.2)'
  },
  dark: {
    background: 'rgba(255, 255, 255, 0.05)'
  }
}

const themeStyle = ({ theme }) => css`
  background: ${themeObj[theme]['background']};
` 

const loading = keyframes`
  0% { transform: translateX(-150%)}
  50% { transform: translateX(-60%)}
  100% { transform: translateX(150%)} 
`

export const StyledShimmer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;  
  animation: ${loading} 2.5s infinite;

  & > div {
    width: 50%;
    height: 100%;
    transform: skewX(-20deg);
    box-shadow: 0 0 30px 30px rgba(255, 255, 255, 0.05);
    ${themeStyle}
  }
`

StyledShimmer.defaultProps = {
  theme: 'light'
}
