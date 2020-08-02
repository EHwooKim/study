import React from "react"

const { useState, useRef } = React // extends React.Component 를 Component로 줄여 쓸 수 있게

const WordRelayTypescript = () => {
  const [word, setWord] = useState('영정길')
  const [value, setValue] = useState('')
  const [result, setResult] = useState('')
  const inputRef = useRef(null)

  const onSubmitForm = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (word[word.length - 1] === value[0]) {
      setResult('딩동댕!!!')
      setWord(value)
      setValue('')
      // inputRef.current.focus()
    } else {
      setResult('땡')
      setValue('')
      // inputRef.current.focus()
    }
  }
  const onChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
      <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="wordInput">글자를 입력하세요</label>
        <input ref={inputRef} value={value} onChange={onChangeInput}/>
        <button id="wordInput" className="wordInput">입력</button>
      </form>
      <div>{result}</div>
      </>
  )
}

module.exports = WordRelayTypescript