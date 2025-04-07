import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from '../atoms';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const Form = styled.form`
  width: 100%;
  background-color: white;
  input {
    width: 100%;
  }
`;

const Input = styled.input`
  all: unset;
  text-align: center;
  padding: 8px;
`;

interface IForm {
  toDo: string;
}

interface IInputProps {
  boardId: string;
}

function InputText({ boardId }: IInputProps) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });

    setValue('toDo', '');
  };

  useEffect(() => {
    localStorage.setItem('toDo', JSON.stringify(toDos));
  }, [toDos]);

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input
        {...register('toDo', { required: true })}
        type="text"
        placeholder={`Add task on ${boardId}`}
      />
    </Form>
  );
}

export default InputText;
