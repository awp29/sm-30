import { useDispatch } from "react-redux";
import { Cell, selectCell } from "../../gameSlice";

interface Props {
  cell: Cell;
}

const EmptyCell = (props: Props) => {
  const { cell } = props;

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(selectCell());
  };

  if (cell.visible) {
    return (
      <div
        className={`w-[40px] h-[40px] bg-[#D9CAB8] rounded-[4px] flex items-center justify-center`}
      />
    );
  }

  return (
    <div className="bg-[#40341F] rounded-[4px]">
      <button
        className={`w-[40px] h-[40px] hover:bg-[#F07032] hover:opacity-90 rounded-[4px] flex items-center justify-center text-white`}
        onClick={handleClick}
      >
        {/* {cell.flagged ? <Flag /> : null} */}
      </button>
    </div>
  );
};

export default EmptyCell;
