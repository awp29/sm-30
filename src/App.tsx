import { useSelector } from "react-redux";
import { RootState } from "./store";
import { CellType } from "./gameSlice";
import { TouchingCell, EmptyCell, MineCell } from "./components/cells";
import GameBoard from "./components/board/GameBoard";

import Nav from "./components/nav/Nav";
import DifficultySelect from "./components/difficultySelect/DifficultySelect";

function App() {
  const cells = useSelector((state: RootState) => state.game.cells);

  const renderCells = () => {
    const flattenedCells = cells.flat();
    const cellsToRender = flattenedCells.map((cell) => {
      switch (cell.type) {
        case CellType.Empty:
          return (
            <EmptyCell
              key={`cell-${cell.rowIndex}-${cell.columnIndex}`}
              cell={cell}
            />
          );

        case CellType.Mine:
          return (
            <MineCell
              key={`cell-${cell.rowIndex}-${cell.columnIndex}`}
              cell={cell}
            />
          );

        case CellType.Touching:
          return (
            <TouchingCell
              key={`cell-${cell.rowIndex}-${cell.columnIndex}`}
              cell={cell}
            />
          );
      }
    });

    return cellsToRender;
  };

  return (
    <>
      <Nav>
        <Nav.Title />
        <Nav.Links>
          <Nav.Link to="/">Home</Nav.Link>
          <Nav.Link to="instructions">Instructions</Nav.Link>
        </Nav.Links>
      </Nav>

      <div className="pl-[120px] mt-[18px]">
        <DifficultySelect />
      </div>

      <GameBoard>
        <GameBoard.Header>
          <GameBoard.Mines />
          <GameBoard.FaceButton />
          <GameBoard.Timer />
        </GameBoard.Header>

        <GameBoard.Cells>{renderCells()}</GameBoard.Cells>
      </GameBoard>
    </>
  );
}

export default App;
