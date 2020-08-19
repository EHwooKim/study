import React from 'react'
import './TodoLi.css'

const TodoLi = ({todo, i, deleteTodo, cancelDeleteTodo, tryDeleteToto}) => {
  return (
    <li className="todo">
      <span>{todo.todo}</span>
      {todo.delete
        ? <span>
            <button className="delete-btn" onClick={() => deleteTodo(todo.id, i)}>삭제</button>
            <button className="delete-btn" onClick={() => cancelDeleteTodo(i)}>취소</button>
          </span>
        : <button className="delete-btn" onClick={() => tryDeleteToto(i)}>삭제</button>}
    </li>
  )
}

export default TodoLi