import { Injectable } from '@angular/core';
import { Todo } from './Todo'

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos: Todo[] = [
    {
      id: 1,
      content: 'Study Angular',
      completed: false
    }
  ]

  constructor() { }

  genId(): number {
    return Math.max(...this.todos.map(todo => todo.id)) + 1
  }

  getTodos(): Todo[] {
    return this.todos.filter(todo =>
      todo.completed === false
    )
  }

  addTodo(todo: string): Todo[] {
    todo = todo.trim()

    if (!todo) return
    const newTodo = {
      id: this.genId(),
      content: todo,
      completed: false
    }
    this.todos.push(newTodo)
    return this.getTodos()
  }

  deleteTodo(id: number): Todo[] {
    this.todos = this.todos.map(todo => 
      todo.id === id ? {...todo, completed: true} : todo
    )
    return this.getTodos()
  }

}
