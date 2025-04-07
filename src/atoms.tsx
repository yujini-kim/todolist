import { atom } from 'recoil';

const localData = localStorage.getItem('toDo');
export interface ITodo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: localData
    ? JSON.parse(localData)
    : {
        TODO: [],
        DOING: [],
        DONE: [],
      },
});
