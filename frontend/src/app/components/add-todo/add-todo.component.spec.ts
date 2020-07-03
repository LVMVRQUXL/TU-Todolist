import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoComponent } from './add-todo.component';
import { TodoService } from 'src/app/services/todo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MockTodoApiResponse } from 'src/assets/mock-data/mock-todo-response.json';

fdescribe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;
  
  let todoService = {
    getTodos: () => of(MockTodoApiResponse),
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTodoComponent ],
      imports: [RouterTestingModule],
      providers: [
        {provide: TodoService, useValue: todoService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
