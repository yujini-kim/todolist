import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Wrapper = styled.div<{ show: boolean }>`
  width: 60px;
  height: 60px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-top: 10px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transform: ${(props) => (props.show ? 'scale(1)' : 'scale(0.9)')};
  transition: all 0.3s ease-in-out;
`;

const Img = styled.div`
  width: 30px;
`;

interface DeleteProps {
  show: boolean;
}

function Delete({ show }: DeleteProps) {
  return (
    <Droppable droppableId="delete">
      {(magic, snapshot) => (
        <Wrapper
          show={show}
          ref={magic.innerRef}
          {...magic.droppableProps}
          style={{
            backgroundColor: snapshot.isDraggingOver ? 'tomato' : 'white',
          }}
        >
          {magic.placeholder}
          <Img>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
              />
            </svg>
          </Img>
        </Wrapper>
      )}
    </Droppable>
  );
}

export default Delete;
