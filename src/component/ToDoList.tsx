import { useRecoilValue } from 'recoil';
import CreateTodo from './CreateTodo';
import { toDoSelector, toDoState } from '../atoms';
import Todo from './ToDo';

function ToDoList() {
  const [toDo, doing, done] = useRecoilValue(toDoSelector);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateTodo />
      <h2>To Do</h2>
      <ul>
        {toDo.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
      <hr />
      <h2>Doing</h2>
      <ul>
        {doing.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
      <hr />
      <h2>Done</h2>
      <ul>
        {done.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
      <hr />
    </div>
  );
}

export default ToDoList;
