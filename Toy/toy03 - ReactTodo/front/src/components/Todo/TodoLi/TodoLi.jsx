import React, { memo } from 'react'
import './TodoLi.css'

const TodoLi = memo(({todo, i, deleteTodo, cancelDeleteTodo, tryDeleteToto}) => {
  console.log(`TodoLi rendered - ${i}`)

  return (
    <li className="todo">
      <span>{todo.todo}</span>
      {todo.delete
        ? <span>
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>삭제</button>
            <button className="delete-btn" onClick={() => cancelDeleteTodo(todo.id)}>취소</button>
          </span>
        : <button className="delete-btn" onClick={() => tryDeleteToto(todo.id)}>삭제</button>}
    </li>
  )
})

export default TodoLi