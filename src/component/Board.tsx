import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DraggableCard';
import { useForm } from 'react-hook-form';
import { ITodo, toDoState } from '../atoms';
import { useSetRecoilState } from 'recoil';
import InputText from './InputText';

const Wrapper = styled.div`
  width: 300px;

  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? '#dfe6f9'
      : props.isDraggingFromThis
        ? '#b2bec3'
        : 'transparent'};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

export interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)} //드래그 해서 떠날때
            //문자가 있으면 무조건 true, 없으면 무조건 false
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
      <InputText boardId={boardId} />
    </Wrapper>
  );
}
export default Board;
