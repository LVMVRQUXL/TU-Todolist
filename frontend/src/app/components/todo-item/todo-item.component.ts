import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';

import { Todo } from '../../interface/todo.interface'

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit() {
  }

  // Set Dynamic Classes
  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }

    return classes;
  }

  onToggle(todo) {
    // Toggle in UI
    todo.completed = !todo.completed;
  }

  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }

  formatStringId(string): string {
    const specialChars = [/\W/]
    specialChars.forEach((char) => {
      string = string.replace(new RegExp(char, 'g'), '-');
    });
    return string;
  }

}
