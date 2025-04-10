import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useSetRecoilState } from 'recoil';

import styled from 'styled-components';
import { toDoClick } from '../atoms';

const Card = styled.div<{ idDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.idDragging ? '#74b9ff' : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.idDragging ? '0px 2px 5px rgba(15, 15, 15, 0.5)' : 'none'};
`;

interface IProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

const DraggableCard = ({ toDoId, toDoText, index }: IProps) => {
  const setClick = useSetRecoilState(toDoClick);
  const onMouseDown = () => {
    setClick((pre) => !pre);
  };

  return (
    <Draggable draggableId={toDoId + ''} index={index}>
      {(magic, snapshot) => (
        <Card
          onMouseDown={onMouseDown}
          idDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
