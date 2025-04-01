import { useRecoilState, useRecoilValue } from 'recoil';
import CreateTodo from './CreateTodo';
import { Categories, categoryState, toDoSelector, toDoState } from '../atoms';
import Todo from './ToDo';

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>TO DO</option>
        <option value={Categories.DOING}>DOING</option>
        <option value={Categories.DONE}>DONE</option>
      </select>
      <CreateTodo />
      {toDos?.map((toDo) => <Todo key={toDo.id} {...toDo} />)}
    </div>
  );
}

export default ToDoList;
