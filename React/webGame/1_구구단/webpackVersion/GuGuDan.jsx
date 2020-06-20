const React = require('react')
const { useState, useRef } = React

const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9))
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9))
  const [value, setValue] = useState('')
  const [result, setResult] = useState('')
  const inputRef = useRef(null) 

  const onChnageInput= (e) => {
    setValue(e.target.value)
  }

  const onSubmitForm = (e) => {
    e.preventDefault()
    if (parseInt(value) === first * second) {
      setResult((prevResult) => {
        return '정답: ' + value
      })
      setFirst(Math.ceil(Math.random() * 9))
      setSecond(Math.ceil(Math.random() * 9))
      setValue('')
      inputRef.current.focus()
    } else {
      setResult('떙!')
      setValue('')
      inputRef.current.focus()
    }
  }

  console.log('렌더링')
  return (
    <>
      <div>{first} 곱하기 {second}는?</div>
      <form onSubmit={onSubmitForm} >
        <input ref={inputRef} onChange={onChnageInput} value={value} />
        <button>입력</button>
      </form>
      <div id="result">{result}</div>
    </>
  )
}

module.exports = GuGuDan