import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { CellType, selectDifficulty } from "./gameSlice";
import { TouchingCell, EmptyCell, MineCell } from "./components/cells";
import GameBoard from "./components/board/GameBoard";
import { DifficultyType } from "./gameUtils";

function App() {
  const dispatch = useDispatch();
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
      <button onClick={() => dispatch(selectDifficulty(DifficultyType.Easy))}>
        Easy
      </button>
      <button
        onClick={() => dispatch(selectDifficulty(DifficultyType.Intermediate))}
      >
        Intermediate
      </button>
      <button onClick={() => dispatch(selectDifficulty(DifficultyType.Expert))}>
        Expert
      </button>

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
