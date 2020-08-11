import React from 'react'
import { Layout, Menu,  } from 'antd'
const { Header } = Layout

function MyHeader() {
 return (
  <Header className="header">
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
      <Menu.Item key="1">JSON Place Holder</Menu.Item>
    </Menu>
  </Header>
 )
}

export default MyHeader