import React from 'react'
import './TodoLi.css'

interface Todo {
  id: number,
  value: string,
  delete: boolean,
  createdAt: string
}
type TodoProps = {
  todo: Todo,
  i: number,
  deleteTodo: (i:number) => void,
  cancelDeleteTodo: (i:number) => void,
  tryDeleteToto: (i:number) => void
}

const TodoLi = ({todo, i, deleteTodo, cancelDeleteTodo, tryDeleteToto}: TodoProps) => {
  return (
    <li key={todo.value + i} className="todo">
      <span>{todo.value}</span>
      {todo.delete
        ? <span>
            <button className="delete-btn" onClick={() => deleteTodo(i)}>삭제</button>
            <button className="delete-btn" onClick={() => cancelDeleteTodo(i)}>취소</button>
          </span>
        : <button className="delete-btn" onClick={() => tryDeleteToto(i)}>삭제</button>}
    </li>
  )
}

export default TodoLi