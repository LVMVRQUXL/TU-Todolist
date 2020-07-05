import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { take } from 'rxjs/operators'

describe('DataService', () => {
  

  const httpClient = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => TestBed.configureTestingModule({
    declarations:[
      
    ],
      providers:[
          {provide: HttpClient, useValue: httpClient}
      ]
  }));

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  it('should get todos', fakeAsync(() => {
    const service: DataService = TestBed.get(DataService);
    httpClient.get.and.returnValue(of({todos:[{},{}]}));
    service.getTodos().pipe(take(1)).subscribe((resp:any)=>{
        expect(resp.todos.length).toBe(1);
    });
    tick();
  }))
});
