import { Component, OnInit } from '@angular/core';
import { Todo } from '../Todo'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = [
    {
      id: 1,
      content: 'Study Angular',
      completed: false
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  addTodo(todo: string): void {
    if (!todo.trim()) return
    
    const newTodo = {
      id: this.todos.length + 1,
      content: todo,
      completed: false
    }
    this.todos.push(newTodo)
  }
}
