import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [value, setValue] = useState('')
  const [todoList, setTodo] = useState(['할일1', '할일2'])


  const onChnageInput = e => {
    setValue(e.target.value)
  }
  const addTodo = (e) => {
    e.preventDefault()
    if (value === '') {
      alert('내용을 입력해주세요')
      return
    }
    setTodo(prevTodoList => {
      return [...prevTodoList, value]
    })
    setValue('')
  }
  const deleteToto = i => () => {
    console.log('삭제')
    console.log(i)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span>
          React Todo
        </span>
      </header>
      <div className="todo-container">
        <form className="input-container" onSubmit={addTodo}>
          <input type="text" value={value} onChange={onChnageInput} placeholder="할일을 입력하세요" />
          <button type="submit" >추가</button>
        </form>
        <div className="todo-list-container">
          <ul>
            {todoList.map((v, i) => {
              return (
                <li key={v + i} className="todo">
                  <span>{v}</span>
                  <button className="delete-btn" onClick={deleteToto(i)}>삭제</button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
