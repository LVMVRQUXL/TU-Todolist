import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoComponent } from './add-todo.component';
import { TodoService } from 'src/app/services/todo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MockTodoApiResponse } from 'src/assets/mock-data/mock-todo-response.json';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;
  
  let todoService = {
    getTodos: () => of(MockTodoApiResponse),
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTodoComponent ],
      imports: [RouterTestingModule, ReactiveFormsModule],
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

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  /*it('should emit on click', ()=>{
    console.log(fixture)
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.btn');
    button.dispatchEvent(new Event('click'));
    console.log(button)
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
  });*/
});
