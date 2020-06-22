// import React, { Component } from 'react'
const React = require('react')
const { Component } = require('react')

class Try extends Component {
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

module.exports = Try
// export default Try