import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  interface Todo {
    value: string,
    delete: boolean
  }

  const [value, setValue] = useState<string>('')
  // const [todoList, setTodoList] = useState(
  //   JSON.parse(localStorage.getItem('todoList')) || [] 이부분 타입에러 때문에 잠시 빼놓습니다..
  // )
  const [todoList, setTodoList] = useState<Todo[]>([])

  const onChnageInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
  }
  const addTodo = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (value === '') {
      alert('내용을 입력해주세요')
      return
    }
    setTodoList(prevTodoList => {
      return [...prevTodoList, {value: value, delete: false}]
    })
    setValue('')
  }
  const tryDeleteToto = (i: number) => () => {
    setTodoList(prevTodoList => {
      let array = [...prevTodoList]
      array.splice(i, 1, {value: prevTodoList[i].value, delete: true})
      return array
    })
  }
  const cancelDeleteTodo = (i: number) => () => {
    setTodoList(prevTodoList => {
      let array = [...prevTodoList]
      array.splice(i, 1, {value: prevTodoList[i].value, delete: false})
      return array
    })
  }
  const deleteToto = (i: number) => () => {
    setTodoList(prevTodoList => {
      let array = [...prevTodoList] // 이거 이렇게 안하고 prevTodoList 하나로 다 하니 원하는대로 안나와..
      array.splice(i, 1)
      return array
    })
  }
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList)) // 추가, 삭제시 실행되도록. 처음에 JSON.stringfy-parse 안해서 타입오류 발생
  }, [todoList])

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
                <li key={v.value + i} className="todo">
                  <span>{v.value}</span>
                  {v.delete
                    ? <span>
                        <button className="delete-btn" onClick={deleteToto(i)}>삭제</button>
                        <button className="delete-btn" onClick={cancelDeleteTodo(i)}>취소</button>
                      </span>
                    : <button className="delete-btn" onClick={tryDeleteToto(i)}>삭제</button>}
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
