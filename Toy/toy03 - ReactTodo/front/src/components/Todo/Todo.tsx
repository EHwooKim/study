import React, { useState, useEffect } from 'react'
import api from '../../apis'
import TodoLi from './TodoLi/TodoLi'

import './Todo.css'

const Todo = () => {
  interface Todo {
    id: number,
    todo: string,
    delete: boolean,
    created_at: string,
    updated_at: string,
    deleted_at: string | null,
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
    api.postNewTodo({ todo: value })
      .then(res => setTodoList(prevTodoList => {
        return [...prevTodoList, res.data]
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
      .then(res => setTodoList(prevTodoList => {
        let array = [...prevTodoList]
        array.splice(i, 1)
        return array
      }))
      .catch(console.error)
  }

  useEffect(() => { // 처음 접속시 todoList가져오기
    api.getAllTodos()
      .then(res => setTodoList(res.data))
      .catch(err => console.error(err))
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