// import React, { Component } from 'react'
const React = require('react')
const { Component } = require('react')

class Try extends Component {
  render() {
    return (
      <li>
        <div>{this.props.tryInfo.try}</div>
        <div>{this.props.tryInfo.result}</div>
      </li>
    )
  }
}

module.exports = Try
// export default Try