import { IToDo } from '../atoms';

export default function Todo({ text }: IToDo) {
  return <li>{text}</li>;
}
