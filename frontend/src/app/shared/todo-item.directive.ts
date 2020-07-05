import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[app-todo-item]'
})
export class TodoDirective {

  constructor(el: ElementRef) {
    el.nativeElement.background = '';
    
  }

}
