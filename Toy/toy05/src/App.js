import React from 'react';
import styled from 'styled-components'
import Header from './components/Header/Header'
import Articles from './components/Articles/Articles'
import Users from './components/User/User'

const Content = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 100px;
`

function App() {
  return (
    <div>
      <Header />
      <Content>
        <Articles />
        <Users />
      </Content>
    </div>
  );
}

export default App;
