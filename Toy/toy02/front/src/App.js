import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import MyHeader from './components/MyHeader'
import MySider from './components/MySider'
import Post from './components/Post'
import User from './components/User'
import Album from './components/Album'

import { Layout } from 'antd';

const { Content, Footer } = Layout;

function App() {
  
  return (
    <Router>
      <Layout style={{ height: '100vh' }}>
        <MyHeader />
        <Layout>
          <MySider />
          <Layout style={{ padding: '24px', marginLeft: 200 }}>
            <Content style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                backgroundColor: '#fff',
            }}>
              <Switch>
                <Route exact path="/" component={Post}/>
                <Route path="/user" component={User}/>
                <Route path="/album" component={Album}/>
              </Switch>
            </Content>
          </Layout>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Router>
  )
}

export default App;
