// import React, { Component } from 'react'
const React = require('react')
const { Component } = require('react')

class Try extends Component {
  render() {
    return (
      <li>
        <b>{this.props.value.fruit}</b> - {this.props.value.taste}
      </li>
    )
  }
}

module.exports = Try
// export default Try