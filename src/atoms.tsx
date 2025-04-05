import { atom, selector } from 'recoil';

export interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    TODO: ['a', 'b', 'c', 'd', 'e', 'f'],
    DOING: ['a', 'b'],
    DONE: ['c', 'd', 'e'],
  },
});
