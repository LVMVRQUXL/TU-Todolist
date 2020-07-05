import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TodoApiReponse } from '../interface/todo.interface';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient){ }
    getTodos():Observable<TodoApiReponse> {
        return this.http.get<TodoApiReponse>(`assets/data/todo-types.json`).pipe(tap((resp)=>{
            resp.todos.pop();
        }))
    }
}