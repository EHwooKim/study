import { Component, OnInit } from '@angular/core';
import { Todo } from '../Todo'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todoContent:string = ''
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

  addTodo(): void {
    if (!this.todoContent) return
    
    const newTodo = {
      id: this.todos.length + 1,
      content: this.todoContent,
      completed: false
    }
    this.todos.push(newTodo)
    this.todoContent = ''
  }

}
