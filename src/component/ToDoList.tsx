import { useRecoilValue } from 'recoil';
import CreateTodo from './CreateTodo';
import { toDoState } from '../atoms';
import Todo from './ToDo';

function ToDoList() {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateTodo />
      <ul>
        {toDos.map((todo) => (
          <Todo {...todo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
