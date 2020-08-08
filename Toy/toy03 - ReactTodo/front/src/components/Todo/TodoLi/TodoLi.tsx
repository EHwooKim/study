import React from 'react'
import './TodoLi.css'

interface Todo {
  id: number,
  todo: string,
  delete: boolean,
  created_at: string,
  updated_at: string,
  deleted_at: string | null,
}
type TodoProps = {
  todo: Todo,
  i: number,
  deleteTodo: (id: number, i: number) => void,
  cancelDeleteTodo: (i:number) => void,
  tryDeleteToto: (i:number) => void
}

const TodoLi = ({todo, i, deleteTodo, cancelDeleteTodo, tryDeleteToto}: TodoProps) => {
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