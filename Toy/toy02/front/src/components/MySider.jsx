import React from 'react';
import { Link } from 'react-router-dom'


import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, PictureOutlined } from '@ant-design/icons';

const { Sider } = Layout;

function MySider() {

  return (
    <Sider style={{
      overflow: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
    }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="Post" icon={<LaptopOutlined />} > <Link to="/post">Post</Link> </Menu.Item>
        <Menu.Item key="User" icon={<UserOutlined />} ><Link  to="/user">User</Link></Menu.Item>
        <Menu.Item key="Album" icon={<PictureOutlined />} ><Link  to="/album">Album</Link></Menu.Item>
      </Menu>
    </Sider>
  )
}

export default MySider