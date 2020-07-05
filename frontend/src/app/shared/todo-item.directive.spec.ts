import { TodoDirective } from './todo-item.directive';
import { Component } from '@angular/core';
import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TodosComponent } from '../components/todos/todos.component';

describe('TodoDirective', () => {
  @Component({
    template: '<div app-todo-item></div>'
  })

  class TestTodoItemComponent {
    
  }

  let todosComponent: TodosComponent
  

  let component: TestTodoItemComponent;
  let fixture: ComponentFixture<TestTodoItemComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTodoItemComponent, TodoDirective, TodosComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTodoItemComponent);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should initialize without background', () => {
    expect(nativeEl.querySelector('div').style.background).toBe('');
  })

  it('should initialize with background', fakeAsync(() => {
    //spyOn(component, 'addTodo');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    //expect(component.addTodo).toHaveBeenCalled()
  }))
});
