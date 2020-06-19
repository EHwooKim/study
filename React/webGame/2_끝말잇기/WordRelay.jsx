const React = require('react')
const { Component } = React // extends React.Component 를 Component로 줄여 쓸 수 있게

class WordRelay extends Component {
    state = {
        text: 'hello, webpack'
    }
    render() {
        return <h1>{this.state.text}</h1>
    }   
}

module.exports = WordRelay