import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import MyHeader from './components/MyHeader'
import MySider from './components/MySider'
import Post from './components/Post'
import PostDetail from './components/PostDetail'
import User from './components/User'
import UserDetail from './components/UserDetail'
import Album from './components/Album'
import AlbumDetail from './components/AlbumDetail'

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
                overflow: 'scroll'
            }}>
              <Switch>
                <Redirect exact from="/" to="/post" />
                <Route exact path="/post" component={Post}/>
                <Route path="/post/:id" component={PostDetail}/>
                <Route exact path="/user" component={User}/>
                <Route path="/user/:id" component={UserDetail}/>
                <Route exact path="/album" component={Album}/>
                <Route path="/album/:id" component={AlbumDetail}/>
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
