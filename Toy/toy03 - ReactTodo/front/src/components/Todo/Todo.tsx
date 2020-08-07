import React, { useState, useEffect } from 'react'
import api from '../../apis/index'
import TodoLi from './TodoLi/TodoLi'

import './Todo.css'

const Todo = () => {
  interface Todo {
    id: number,
    value: string,
    delete: boolean,
    createdAt: string
  }

  const [value, setValue] = useState<string>('')
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
    api.postNewTodo({ value })
      .then(data => setTodoList(prevTodoList => {
        return [...prevTodoList, data[0]]
      }))
      .catch(console.error)
    setValue('')
  }

  const tryDeleteToto = (i: number) => {
    setTodoList(prevTodoList => {
      let array = [...prevTodoList]
      array.splice(i, 1, {...prevTodoList[i], delete: true})
      return array
    })
  }
  const cancelDeleteTodo = (i: number) => {
    setTodoList(prevTodoList => {
      let array = [...prevTodoList]
      array.splice(i, 1, {...prevTodoList[i], delete: false})
      return array
    })
  }

  const deleteTodo = (id: number, i: number) => {
    api.deleteTodo({ id: id })
      .then(data => setTodoList(prevTodoList => {
        let array = [...prevTodoList]
        array.splice(i, 1)
        return array
      }))
      .catch(console.error)
    // setTodoList(prevTodoList => {
    //   let array = [...prevTodoList] // 이거 이렇게 안하고 prevTodoList 하나로 다 하니 원하는대로 안나와..
    //   array.splice(i, 1)
    //   return array
    // })
  }

  useEffect(() => { // 처음 접속시 todoList가져오기
    api.getAllTodos().then(setTodoList).catch(console.error)
  }, [])

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList)) // 추가, 삭제시 실행되도록. 처음에 JSON.stringfy-parse 안해서 타입오류 발생
  }, [todoList])


  return (
    <div className="todo-container">
      <form className="input-container" onSubmit={addTodo}>
        <input type="text" value={value} onChange={onChnageInput} placeholder="할일을 입력하세요" />
        <button type="submit" >추가</button>
      </form>
      <div className="todo-list-container">
        <ul>
          {todoList.map((todo, i) => <TodoLi todo={todo} i={i} deleteTodo={deleteTodo} cancelDeleteTodo={cancelDeleteTodo} tryDeleteToto={tryDeleteToto} key={Date.now() + i}/>)}
        </ul>
      </div>
    </div>    
  )
}

export default Todo