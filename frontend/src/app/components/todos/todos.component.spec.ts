import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import { of } from 'rxjs';
import { MockTodoApiResponse } from 'src/assets/mock-data/mock-todo-response.json';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoService } from 'src/app/services/todo.service';
import { MockTodosArrayApiResponse } from 'src/assets/mock-data/mock-todosArray-response.json';

fdescribe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  const todoService = {
    getTodos: () => of(MockTodosArrayApiResponse)
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosComponent ],
      imports: [ RouterTestingModule ],
      providers:[
        {provide: TodoService, useValue: todoService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', fakeAsync(()=>{
    tick();
    expect(component.todos).toEqual(MockTodosArrayApiResponse);
  }))
});
