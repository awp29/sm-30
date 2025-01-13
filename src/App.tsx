import { useSelector } from "react-redux";
import { RootState } from "./store";
import { CellType } from "./gameSlice";
import { TouchingCell, EmptyCell, MineCell } from "./components/cells";
import GameBoard from "./components/board/GameBoard";

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
      <div>
        <GameBoard>
          <GameBoard.Header>
            <GameBoard.Mines />
            <div>FACE</div>
            <div>time</div>
          </GameBoard.Header>
          <div className="grid grid-cols-[repeat(10,_minmax(0,_1fr))] gap-1 row w-max m-auto">
            {renderCells()}
          </div>
        </GameBoard>
      </div>
    </>
  );
}

export default App;
