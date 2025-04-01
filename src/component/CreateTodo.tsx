import { useForm } from 'react-hook-form';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { categoryState, toDoState } from '../atoms';

interface IForm {
  toDo: string;
}

export default function CreateTodo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue('toDo', '', { shouldValidate: true });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('toDo', {
          required: 'Please Write a To Do',
        })}
        placeholder="Write a to do"
      ></input>
      <button>Add</button>
    </form>
  );
}
