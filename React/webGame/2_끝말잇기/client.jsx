const React = require('react')
const ReactDom = require('react-dom')
const { hot } = require('react-hot-loader/root')

const WordRelay = require('./WordRelayTypescript.tsx')

const Hot = hot(WordRelay)

// <GuGuDan /> 과 같은 jsx 문법을 쓰면 파일 확장자를 jsx로 해주는 것이 좋다. (js로 해도는 되지만 파일명으로도 jsx 문법을 썼다는것을 파악할 수 있기 떄문에)
ReactDom.render(<Hot />, document.querySelector('#root')) 
