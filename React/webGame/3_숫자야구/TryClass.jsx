// import React, { Component } from 'react'
const React = require('react')
const { PureComponent } = require('react')

class TryClass extends PureComponent {
  render() {
    const { tryInfo } = this.props
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    )
  }
}

module.exports = TryClass
// export default Try