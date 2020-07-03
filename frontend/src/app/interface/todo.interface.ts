export interface TodoApiReponse {
    todos: Todo[];
    totalTodos: number;   
}

export interface Todo {
    "userId": number,
    "id": number,
    "title":string,
    "completed":boolean
}