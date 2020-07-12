// 인터페이스 정의
interface Todo {
  id: number,
  content: string,
  delete: boolean
}
// Todo 타입의 배열 선언
let todos:Todo[] = []
console.log(todos)

// 파라미터 todo의 타입으로 Todo 인터페이스 선언
const addTodo = (todo: Todo): void => {
  todos = [...todos, todo]
}

// 파라미터 Todo는 Todo 인터페이스를 준수하여야 한다.
const newTodo: Todo = { id: 1, content: 'TypeScript', delete: false }
addTodo(newTodo)
console.log(todos)
