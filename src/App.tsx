import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { IToDoState, toDoState } from './atoms';

import Board from './component/Board';

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setToDos((allBoards) => {
      const copyToDos: IToDoState = {};
      Object.keys(allBoards).forEach((toDosKey) => {
        copyToDos[toDosKey] = [...allBoards[toDosKey]];
      });
      copyToDos[source.droppableId].splice(source.index, 1);
      copyToDos[destination.droppableId].splice(
        destination.index,
        0,
        draggableId
      );
      return copyToDos;
    });
  };
  // const onDragEnd = (info: DropResult) => {
  //   const { destination, draggableId, source } = info;
  //   if (!destination) return;
  //   if (destination?.droppableId === source.droppableId) {
  //     setToDos((allBoard) => {
  //       const boardCopy = [...allBoard[source.droppableId]];
  //       boardCopy.splice(source.index, 1);
  //       boardCopy.splice(destination?.index, 0, draggableId);
  //       return {
  //         [source.droppableId]: boardCopy,
  //         ...allBoard,
  //       };
  //     });
  //   }
  //   if(destination.droppableId !== source.droppableId){
  //     setToDos((allBoard)=>{
  //       const sourceBoard = [...allBoard[source.droppableId]];
  //       const targetBoard = [...allBoard[destination.droppableId]]
  //       sourceBoard.splice(source.index, 1)
  //       targetBoard.splice(destination?.index, 0, draggableId);
  //       return {
  //         ...allBoard,
  //         [source.droppableId]:sourceBoard,
  //         [destination.droppableId]:targetBoard
  //       }
  //     })
  //   }
  // };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
