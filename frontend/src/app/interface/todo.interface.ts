export interface TodoApiReponse {
    todos: Todo[];
    totalTodos: number;   
}

export interface Todo {
    "id": number,
    "title":string,
    "completed":boolean
}