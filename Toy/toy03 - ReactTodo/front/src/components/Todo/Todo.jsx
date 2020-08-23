import React, { useState, useEffect, useRef, memo, useCallback } from 'react'
import api from '../../apis'
import TodoLi from './TodoLi/TodoLi'

import './Todo.css'


function Todo() {
  console.log('Todo rendered')

  const [value, setValue] = useState('') // input value
  const [todoList, setTodoList] = useState([])

  const inputRef = useRef(null)

  const onChnageInput = useCallback((e) => {
    setValue(e.target.value)
  }, [value])

  const addTodo = useCallback((e) => {
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
  }, [value])

  const tryDeleteToto = useCallback((id) => {
    setTodoList(todoList.map((v) => v.id === id 
      ? {...v, delete: true}
      : v))
  }, [todoList])

  const cancelDeleteTodo = useCallback((id) => {
    setTodoList(todoList.map((v) => v.id === id 
      ? {...v, delete: false}
      : v))
  }, [todoList])

  const deleteTodo = useCallback((id) => {
    api.deleteTodo({ id: id })
      .then(res => setTodoList(todoList
        .filter((v) => v.id !== id))
      )
      .catch(console.error)
  }, [todoList])

  useEffect(() => { // 처음 접속시 todoList가져오기
    api.getAllTodos()
      .then(res => setTodoList(res.data))
      .catch(err => console.error(err))
  }, [])


  // useEffect(() => { // 타이핑시 포커스.. 다른 input에 포커싱중일 때 처리..
  //   const focusToInput = () => {
  //     inputRef.current.focus()
  //   } 
  //   window.addEventListener('keydown', focusToInput)
  //   return () => {
  //     window.removeEventListener('keydown', focusToInput)
  //   }
  // }, [])
  
  return (
    <div className="todo-container">
      <form className="input-container" onSubmit={addTodo}>
        <input type="text" ref={inputRef} value={value} onChange={onChnageInput} placeholder="할일을 입력하세요" />
        <button type="submit" >추가</button>
      </form>
      <div className="todo-list-container">
        <ul>
          {todoList.map((todo, i) => <TodoLi todo={todo} i={i} deleteTodo={deleteTodo} cancelDeleteTodo={cancelDeleteTodo} tryDeleteToto={tryDeleteToto} key={todo.todo+i}/>)}
        </ul>
      </div>
    </div>    
  )
}

export default memo(Todo)