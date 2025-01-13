import { useDispatch, useSelector } from "react-redux";
import {
  Cell,
  FaceState,
  flagCell,
  selectCell,
  updateFace,
} from "../../gameSlice";
import FlagIcon from "../../assets/icons/flag.svg";
import { CELL_SIZE } from "./utils";
import classNames from "classnames";
import { RootState } from "../../store";

interface Props {
  cell: Cell;
}

const MineCell = (props: Props) => {
  const { cell } = props;

  const dispatch = useDispatch();
  const difficulty = useSelector((state: RootState) => state.game.difficulty);

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
          "bg-white rounded-[4px] flex items-center justify-center shadow-lg"
        )}
      >
        <div className="border-[#C5441F] border-4 rounded-full w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="bg-[#40341F] rounded-[4px]">
      <button
        className={classNames(
          CELL_SIZE[difficulty.type],
          "hover:bg-[#F07032] hover:opacity-90 rounded-[4px] flex items-center justify-center text-white shadow-lg"
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

export default MineCell;
