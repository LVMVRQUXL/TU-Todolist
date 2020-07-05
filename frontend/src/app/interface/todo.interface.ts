export interface TodoApiReponse {
    todos: Todo[]  
}

export interface Todo {
    userId: number,
    id: number,
    title:string,
    completed:boolean
}