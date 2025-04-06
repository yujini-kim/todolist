import { atom, selector } from 'recoil';

export interface ITodo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    TODO: [],
    DOING: [],
    DONE: [],
  },
});
