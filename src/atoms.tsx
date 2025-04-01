import { atom, selector } from 'recoil';

export enum Categories {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}
export interface IToDo {
  text: string;
  category: Categories;
  id: number;
}

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const todoStoreKey = 'Todo'; // localStorage에서 사용할 키 이름
      const savedValue = localStorage.getItem(todoStoreKey);

      // localStorage에 저장된 값이 있다면 초기 상태로 설정
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      // 상태가 변경될 때마다 localStorage에 저장
      onSet((newValue) => {
        localStorage.setItem(todoStoreKey, JSON.stringify(newValue));
      });
    },
  ],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
