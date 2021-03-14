import { Component, OnInit } from '@angular/core';

import { Todo } from '../Todo'
import { TodosService } from '../todos.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = []
  constructor(
    private todosService: TodosService
  ) { }

  ngOnInit(): void {
    this.getTodos()
  }

  getTodos(): void {
    this.todos = this.todosService.getTodos()
  }
  addTodo(todo: string): void {
    this.todos = this.todosService.addTodo(todo)
  }
  deleteTodo(id: number): void {
    this.todos = this.todosService.deleteTodo(id)
  }

}
