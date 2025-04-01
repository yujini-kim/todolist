import { useSetRecoilState } from 'recoil';
import { Categories, IToDo, toDoState } from '../atoms';

export default function Todo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((prev) =>
      prev.map((oldToDo) => {
        if (oldToDo.id === id) {
          return { text, id, category: name as any };
        }
        return oldToDo;
      })
    );
  };
  const onDelete = () => {
    setToDos((oldToDos) => {
      const newToDos = oldToDos.filter((todo) => todo.id !== id);
      return newToDos;
    });
  };

  return (
    <li>
      <span>{text}</span>
      <button onClick={onDelete}>delete</button>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}
