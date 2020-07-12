interface ITodo {
  id: number;
  content: string;
  completed: boolean;
}
class Todo2 implements ITodo {
  constructor (
    public id: number,
    public content: string,
    public completed: boolean
  ) {}
}

const todo = new Todo2(1, 'Typescript', false)
console.log(todo)