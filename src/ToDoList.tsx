import { useForm } from 'react-hook-form';

type IFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  CheckingPassword: string;
  username?: string;
};

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const onValid = (data: IFormData) => {
    console.log('data', data);
  };

  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register('email', {
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: 'Only naver.com emails allowed',
            },
          })}
          placeholder="Email"
        />
        <span>{errors.email?.message}</span>

        <input
          {...register('username', {
            required: '유저네임을 입력해주세요',
            minLength: {
              value: 10,
              message: 'Username must be at least 10 characters',
            },
          })}
          placeholder="Username"
        />
        <span>{errors.username?.message}</span>

        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
