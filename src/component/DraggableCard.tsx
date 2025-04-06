import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import styled from 'styled-components';
const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

interface IProps {
  toDo: string;
  index: number;
}

const DraggableCard = ({ toDo, index }: IProps) => {
  return (
    <Draggable
      key={`${index}-${toDo}`}
      draggableId={`${index}-${toDo}`}
      index={index}
    >
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
