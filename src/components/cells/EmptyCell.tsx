import { useDispatch, useSelector } from "react-redux";
import {
  Cell,
  FaceState,
  flagCell,
  GameState,
  selectCell,
  updateFace,
} from "../../gameSlice";
import FlagIcon from "../../assets/icons/flag.svg";
import { RootState } from "../../store";
import classNames from "classnames";
import { CELL_SIZE } from "./utils";

interface Props {
  cell: Cell;
}

const EmptyCell = (props: Props) => {
  const { cell } = props;

  const dispatch = useDispatch();
  const difficulty = useSelector((state: RootState) => state.game.difficulty);
  const gameState = useSelector((state: RootState) => state.game.gameState);

  console.log("gameState", gameState);

  const handleClick = () => {
    dispatch(
      selectCell({ rowIndex: cell.rowIndex, columnIndex: cell.columnIndex })
    );
  };

  const handleRightClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(
      flagCell({ rowIndex: cell.rowIndex, columnIndex: cell.columnIndex })
    );
  };

  if (cell.visible) {
    return (
      <div
        className={classNames(
          CELL_SIZE[difficulty.type],
          "bg-[#D9CAB8] rounded-[4px] flex items-center justify-center shadow-lg"
        )}
      />
    );
  }

  return (
    <div className="bg-[#40341F] rounded-[4px]">
      <button
        className={classNames(
          CELL_SIZE[difficulty.type],
          "hover:bg-[#F07032] hover:opacity-90 rounded-[4px] flex items-center justify-center text-whit shadow-lg",
          gameState === GameState.Playing
            ? "pointer-events-auto"
            : "pointer-events-none"
        )}
        onClick={handleClick}
        onContextMenu={handleRightClick}
        onMouseDown={() => dispatch(updateFace(FaceState.Worried))}
        onMouseUp={() => dispatch(updateFace(FaceState.Idle))}
        onMouseOut={() => dispatch(updateFace(FaceState.Idle))}
      >
        {cell.flagged ? <FlagIcon /> : null}
      </button>
    </div>
  );
};

export default EmptyCell;
