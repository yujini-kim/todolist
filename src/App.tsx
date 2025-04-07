import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoClick, toDoState } from './atoms';
import Board from './component/Board';
import Delete from './component/Delete';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [Click, setClick] = useRecoilState(toDoClick);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    setClick(false);
    if (!destination) return;

    // 삭제 droppable로 드롭되었을 때
    if (destination.droppableId === 'delete') {
      setToDos((allBoards) => {
        const copy = { ...allBoards };
        copy[source.droppableId] = [...copy[source.droppableId]];
        copy[source.droppableId].splice(source.index, 1);
        return copy;
      });
      return;
    }

    // 동일 보드 내 이동
    if (destination.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
      return;
    }

    // 크로스 보드 이동 (delete가 아닌 경우)
    setToDos((allBoards) => {
      const sourceBoard = [...allBoards[source.droppableId]];
      const taskObj = sourceBoard[source.index];
      const destinationBoard = [...allBoards[destination.droppableId]];
      sourceBoard.splice(source.index, 1);
      destinationBoard.splice(destination.index, 0, taskObj);
      return {
        ...allBoards,
        [source.droppableId]: sourceBoard,
        [destination.droppableId]: destinationBoard,
      };
    });
  };
  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        {Click ? <Delete show={Click} /> : null}
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </Container>
  );
}

export default App;
