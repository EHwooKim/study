const React = require('react')
const ReactDom = require('react-dom')
const { hot } = require('react-hot-loader/root')

const NumberBaseball = require('./NumberBaseball')

import RenderTest from './RenderTest'

const Hot = hot(NumberBaseball)
// const Hot = hot(RenderTest)

ReactDom.render(<Hot />, document.querySelector('#root')) 
