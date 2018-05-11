import { Component, OnInit } from '@angular/core';
import { TodoDataService } from './todo-data.service';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent implements OnInit {

  todos: Todo[] = [];

  constructor(private todoDataService: TodoDataService) {}

  // The AppComponent requests all todo records from the API on instantiation.
  ngOnInit() {
    this.todoDataService
      .getAllTodos()
      .subscribe((todos) => {
        this.todos = todos;
      });
  }

  // All methods starting with 'on' subscribe to the Observable,
  // otherwise the http request is never made.
  onAddTodo(todo) {
    if (this.duplicateOrEmpty(todo)) {
      return;
    }
    this.todoDataService
      .addTodo(todo)
      .subscribe(
        (newTodo) => {
          this.todos = this.todos.concat(newTodo);
        }
      );
  }

  onToggleTodoComplete(todo) {
    this.todoDataService
      .toggleTodoComplete(todo)
      .subscribe(
        (updatedTodo) => {
          todo = updatedTodo;
        }
      );
  }

  onRemoveTodo(todo) {
    this.todoDataService
      .deleteTodoById(todo.id)
      .subscribe(
        (_) => {
          this.todos = this.todos.filter((t) => t.id !== todo.id);
        }
      );
  }

  // Checks if the todo object,
  // that's about to be added to the database as a record,
  // is a duplicate or has an empty value.
  duplicateOrEmpty(todo) {
    for(let i = 0; i < this.todos.length; i++) {
      if (todo.title === "" || todo.title === this.todos[i].title) {
        return true;
      }
    }
  }

}
