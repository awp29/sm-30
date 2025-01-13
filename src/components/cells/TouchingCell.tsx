import { useDispatch } from "react-redux";
import { Cell, flagCell, selectCell } from "../../gameSlice";
import Flag from "../../assets/icons/flag.svg";

interface Props {
  cell: Cell;
}

const TouchingCell = (props: Props) => {
  const { cell } = props;

  const dispatch = useDispatch();

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
        className={`w-[40px] h-[40px] bg-[#D9CAB8] rounded-[4px] flex items-center justify-center`}
      >
        <span className="font-bold text-2xl">{cell.touching}</span>
      </div>
    );
  }

  return (
    <div className="bg-[#40341F] rounded-[4px]">
      <button
        className={`w-[40px] h-[40px] hover:bg-[#F07032] hover:opacity-90 rounded-[4px] flex items-center justify-center text-white`}
        onClick={handleClick}
        onContextMenu={handleRightClick}
      >
        {cell.flagged ? <Flag /> : null}
      </button>
    </div>
  );
};

export default TouchingCell;
